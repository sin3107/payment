import {userDb, productDb, paymentDb} from "../db_handler/index.js"
import errorMessage from "../helper/error.js";
import { valid } from '../helper/utils.js';
import tossPayments from 'tosspayments';

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

async function addProduct(userId, body){
    try {
        const model = {
            title: {type: 'str'},
            productArray: {type: 'arr'},
            amount: {type: 'num'}
        }

        valid({userId, ...body}, model)
        const hasUser = await userDb.findUserById(userId)
        if(!hasUser){
            result.status = false;
            result.body = errMsg.dbError.userNotFound;
            return result;   
        }

        // 반복돌려서 검색하기
        // 상품 확인
        const product = await productDb.findProductById(productId, productamount);
        if(!product){
            result.status = false;
            result.body = errMsg.payment.productNotFound;
            return result;
        }


        // bill log 생성
        const {userName} = hasUser;
        const {title, productArray, amount} = body;

        const billLog = BillLog({title, userId, productArray, amount})
        const billId = await paymentDb.insertBillLog(billLog)

        //구매 상품 각각의 내역을 하위 테이블 생성하여 등록

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
                const paymentInfo = {
                    something: "cancel"
                }
                const failBillLog = paymentDb.updateFailBill(billId, paymentInfo)
                result.status = false;
                result.body = { failBillLog }
                return result;
            } else if (error.code === 'INVALID_CARD_COMPANY') {
                const paymentInfo = {
                    something: "bad"
                }
                const failBillLog = paymentDb.updateFailBill(billId, paymentInfo)
                result.status = false;
                result.body = { failBillLog }
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

        // 성공함
        const paymentInfo = {
            something: 'good'
        }

        const options = {
            uri:"https://api.tosspayments.com/v1/payments/confirm", 
            method: 'POST',
            body: {
                params
            },
            json:true
        }
        request.post(options, function(err,httpResponse,body){ 
            if(err) {
                console.log(`err => ${err}`)
            } else {
                if(res.statusCode == 200) {
                    const paymentInfo = {
                        something: "cancel"
                    }
                    const failBillLog = paymentDb.updateFailBill(billId, paymentInfo)
                    result.status = false;
                    result.body = { failBillLog }
                    return result;
              }
          }
        })


        // bill log update
        await paymentDb.updateSuccessBill(params.orderId, paymentInfo)
    
        result.status = true;
        result.body = {success: true}
        return result;
    } catch (err) {
        console.log(err)
        throw err;
    }
}


async function failPayment(userId, body){
    try {
        const model = {

        }

        valid({userId, ...body}, model)
        const hasUser = await userDb.findUserById(userId)
        if(!hasUser){
            result.status = false;
            result.body = errMsg.dbError.userNotFound;
            return result;   
        }

        const paymentInfo = {
            something: "cancel"
        }
        const failBillLog = paymentDb.updateFailBill(billId, paymentInfo)
        result.status = false;
        result.body = { failBillLog }
        return result;

    } catch (err) {
        console.log(err)
        throw err;
    }
}