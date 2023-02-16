import {userDb, productDb} from '../db-handler/index.js'
import errorMessage from "../helper/error.js";
import { valid } from '../helper/utils.js';

const user_use_cases = {
    addProduct
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

        tossPayments.requestPayment('카드', { // 결제 수단
            // 결제 정보
            amount: amount,
            orderId: billId,
            orderName: title,
            customerName: userName,
            successUrl: 'http://localhost:3000/success',
            failUrl: 'http://localhost:3000/fail',
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

        // 성공함
        const paymentInfo = {
            something: 'good'
        }

        // bill log update
        await paymentDb.updateSuccessBill(billId, paymentInfo)
        

        // db 지갑에 추가
        /*
        productArray 돌려서 각 갯수만큼 insert
        */
        
        result.status = true;
        result.body = {}
        return result;
    } catch (err) {
        console.log(err)
        throw err;
    }
}


async function successPayment(userId, body){
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

        // 성공함
        const paymentInfo = {
            something: 'good'
        }

        // bill log update
        await paymentDb.updateSuccessBill(billId, paymentInfo)
        

        // db 지갑에 추가
        /*
        productArray 돌려서 각 갯수만큼 insert
        */
        
        result.status = true;
        result.body = {}
        return result;
    } catch (err) {
        console.log(err)
        throw err;
    }
}