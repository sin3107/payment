import { memberDb, productDb, paymentDb } from "../db_handler/index.js"
import errorMessage from "../helper/error.js";
import { valid } from '../helper/utils.js';
import { BillLog, BillLogDetail, BillLogProduct, BillLogError } from "../models/index.js"
import request from "request"

const payment_use_case = {
    addPayment,
    successPayment,
    failPayment
};

export {
    payment_use_case
};
const result ={
    status: false,
    body: null
}

async function addPayment(memberId, body){
    try {
        const model = {
            memberId: {type: "num"},
            storeId: {type: "num"},
            billLogType: {type: "str"},
            billLogTitle: {type: "str"},
            billLogTotalPrice: {type: "num"},
            productList: {type: "arr"}
        }

        valid({memberId, ...body}, model);
        const hasUser = await memberDb.findMemberById(memberId);
        if(!hasUser){
            result.status = false;
            result.body = errorMessage.dbError.userNotFound;
            return result;   
        }

        // 반복돌려서 검색하기
        let failList = []
        let productDetailList = []
        // 상품 확인
        await Promise.all(
            productList.map(async (product) => {
                const { productId, productNum } = product;
                if (!productId || !productNum) {
                    failList.push(productId);
                    return;
                }
                const hasProducted = await productDb.findProductById(productId, productNum);

                if (!hasProducted) {
                    failList.push(productId);
                    return;
                } else {
                    productDetailList.push(hasProducted)
                    return;
                }
            })
        )

        if(failList.length > 0) {
            result.status = false;
            result.body = errorMessage.paymentError.productMaxNum;
            return result;
        } 

        const { storeId, billLogType, billLogNumber, billLogTitle, billLogTotalPrice } = body;

        const billLog = BillLog({memberId, storeId, billLogType, billLogNumber, billLogTitle, billLogTotalPrice});
        const billId = await paymentDb.insertBillLog(billLog)
        
        await paymentDb.insertBillLogDetail(BillLogDetail({billId, step: 1}))

        await Promise.all(
            productDetailList.map(async (product) => {
                const { product_id, product_name, product_price } = product;
                const billLogProduct = BillLogProduct({billId, product_id, product_name, product_price})
                await paymentDb.insertBillLogProduct(billLogProduct);
            })
        )
        
        result.status = true;
        result.body = { success: true }
        return result;
    } catch (err) {
        console.log(err)
        throw err;
    }
}


async function successPayment(query){
    try {
        const { paymentKey, orderId: billId, amount } = query;

        // const billLogDetail = BillLogDetail({billId, step: 5})
        // await paymentDb.insertBillLogDetail(billLogDetail);

        const options = {
            uri:"https://api.tosspayments.com/v1/payments/confirm", 
            method: 'POST',
            body: {
                paymentKey, orderId, amount
            },
            json:true
        }
        request.post(options, function(err, httpResponse, body){ 
            if(err) {
                console.log(`err => ${err}`)
            } else {
                if(httpResponse.statusCode != 200) {

                    // bill_log_detail step=4 insert
                    const billLogDetail = BillLogDetail({billId, step: 4})
                    const failBillLog = paymentDb.insertBillLogDetail(billLogDetail);

                    result.status = false;
                    result.body = { }
                    return result;
                }
            }
        })
        
    
        // transaction start

        // bill_log_success table
        // 승인 시 받은 값을 참조하여 payment_key, 결제시간 작성
        // AAA

        // bill_log table & bill_log_product table 
        // 두 table을 참조하여 ticket 발권
        // AAA

        // payment key도 업데이트
        await paymentDb.updateBillLog(billId, { payment_key: paymentKey })

        // 완료 처리
        const billLogDetail = BillLogDetail({billId, step: 5});
        const successBillLog = paymentDb.insertBillLogDetail(billLogDetail);

        // transcation end

        result.status = true;
        result.body = {  }
        return result;
    } catch (err) {
        console.log(err)
        throw err;
    }
}


async function failPayment(query){
    try {
        const {code, message, orderId} = query

        const billLogError = BillLogError({orderId, code, message});
        await paymentDb.insertBillLogError(billLogError);
        result.status = false;
        result.body = errorMessage.paymentError.failPayment;
        return result;

    } catch (err) {
        console.log(err)
        throw err;
    }
}