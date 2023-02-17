import {userDb, productDb, paymentDb} from "../db_handler/index.js"
import errorMessage from "../helper/error.js";
import { valid } from '../helper/utils.js';
import tossPayments from 'tosspayments';
import { BillLog, BillLogDetail, BillLogError} from "../models/index.js"

const user_use_cases = {
    addProduct,
    successPayment,
    failPayment
};

export {
    user_use_cases
};
const result ={
    status: false,
    body: null
}

async function addProduct(memberId, body){
    try {
        const model = {
            memberId: {type: "num"},
            paymentNumber: {type: "str"},
            paymentType: {type: "str"},
            paymentTitle: {type: "str"},
            paymentTotalPrice: {type: "num"},
            productList: {type: "arr"}
        }

        valid({memberId, ...body}, model);
        const hasUser = await userDb.findUserById(memberId);
        if(!hasUser){
            result.status = false;
            result.body = errorMessage.dbError.userNotFound;
            return result;   
        }

        // 반복돌려서 검색하기
        let failList = []
        // 상품 확인
        const checkProduct = await Promise.all(
            productList.map(async (product) => {
                const { productId, productNum } = product;
                if (!productId || !productNum ) {
                    failList.push(productId);
                    return;
                }
                const hasProducted = await productDb.findProductById(productId, productNum);

                if (!hasProducted) {
                    failList.push(productId);
                    return;
                }
            })
        )

        if(failList.length > 0) {
            result.status = false;
            result.body = errorMessage.paymentError.productMaxNum;
            return result;
        }

        // bill log 생성
        const {userName} = hasUser;
        const {title, productArray, amount} = body;

        const billLog = BillLog({title, memberId, productArray, amount});
        const billId = await paymentDb.insertBillLog(billLog)

        //구매 상품 각각의 내역을 하위 테이블 생성하여 등록

        const billLogDetail = BillLogDetail({billId, step: 2})
        tossPayments.requestPayment('카드', { // 결제 수단
            // 결제 정보
            amount: amount,
            orderId: billId,
            orderName: title,
            customerName: userName,
            successUrl: 'http://localhost:3000/api/success',
            failUrl: 'http://localhost:3000/api/fail',
            flowMode: 'DIRECT',
            easyPay: '토스페이'
          })
          .catch(function (error) {
            if (error.code === 'USER_CANCEL') {
                paymentDb.insertBillLogDetail(billLogDetail);
                result.status = false;
                result.body = errorMessage.paymentError.paymentUserCancel;
                return result;
            } else if (error.code === 'INVALID_CARD_COMPANY') {
                paymentDb.insertBillLogDetail(billLogDetail);
                result.status = false;
                result.body = errorMessage.paymentError.invalidCard;
                return result;
            }
          })
        
        result.status = true;
        result.body = {}
        return result;
    } catch (err) {
        console.log(err)
        throw err;
    }
}


async function successPayment(params){
    try {
        const { paymentKey, orderId: billId, amount } = params;

        const options = {
            uri:"https://api.tosspayments.com/v1/payments/confirm", 
            method: 'POST',
            body: {
                paymentKey, orderId, amount
            },
            json:true
        }
        request.post(options, function(err,httpResponse,body){ 
            if(err) {
                console.log(`err => ${err}`)
            } else {
                if(res.statusCode != 200) {
                    const billLogDetail = BillLogDetail({billId, step: 0})
                    const failBillLog = paymentDb.insertBillLogDetail(billLogDetail);
                    result.status = false;
                    result.body = { failBillLog }
                    return result;
                }
            }
        })
        
        // 티켓 발권

        const billLogDetail = BillLogDetail({billId, step: 5});
        const successBillLog = paymentDb.insertBillLogDetail(billLogDetail);
        result.status = true;
        result.body = { successBillLog }

        return result;
    } catch (err) {
        console.log(err)
        throw err;
    }
}


async function failPayment(params){
    try {
        const {code, message, orderId} = params

        const billLogError = BillLogError({orderId, code});
        await paymentDb.insertBillLogError(billLogError);
        result.status = false;
        result.body = errorMessage.paymentError.failPayment;
        return result;

    } catch (err) {
        console.log(err)
        throw err;
    }
}