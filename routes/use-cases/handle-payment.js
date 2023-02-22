import { memberDb, productDb, paymentDb } from "../db_handler/index.js"
import errorMessage from "../helper/error.js";
import { valid, validArrayObject } from '../helper/utils.js';
import { BillLog, BillLogDetail, BillLogProduct, BillLogError, BillLogSuccess } from "../models/index.js"
import request from "request"

const payment_use_case = {
    addPayment,
    insertBillLogDetail,
    successPayment,
    failPayment,
    insertTestData
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
        const productListModel = {
            productId: {type: "num"},
            productName: {type: "str"},
            productPrice: {type: "num"}
        }

        valid({memberId, ...body}, model);
        validArrayObject(body.productList, productListModel)

        const hasUser = await memberDb.findMemberById(memberId);
        if(!hasUser){
            result.status = false;
            result.body = errorMessage.dbError.userNotFound;
            return result;   
        }

        let failList = []
        let productDetailList = []
        // 상품 확인

        await Promise.all(
            productList.map(async (product) => {
                const { productId, productNum } = product;
                const hasProducted = await productDb.findProductById(productId, productNum);
                
                if (!hasProducted) {
                    failList.push(productId);
                    return;
                } 
                productDetailList.push(hasProducted)
            })
        )

        if(failList.length > 0) {
            result.status = false;
            result.body = errorMessage.paymentError.productMaxNum;
            return result;
        } 

        const { storeId, billLogType, billLogNumber, billLogTitle, billLogTotalPrice } = body;
        const billLog = BillLog({ memberId, storeId, billLogType, billLogNumber, billLogTitle, billLogTotalPrice });

        const billId = await paymentDb.insertBillLog(billLog, productDetailList);

        result.status = true;
        result.body = { _id: billId }
        return result;
    } catch (err) {
        console.log(err)
        throw err;
    }
}

async function insertBillLogDetail(body) {
    try {
        const { billId, step } = body

        const billLogDetail = BillLogDetail({billLogId: billId, step: step});

        result.status = true;
        result.body = billLogDetail
        return result

    } catch(err) {
        throw err
    }
}


async function successPayment(body){
    try {
        const { paymentKey, orderId: billId, amount } = body;

        const options = {
            uri: "https://api.tosspayments.com/v1/payments/confirm", 
            method: "POST",
            body: {
                paymentKey, orderId, amount
            },
            json: true
        }

        // new Promise((resolve, reject) => {})
        const billData = {billLogId: billId, paymentKey, billLogDate: body.approvedAt}
        await retry(0, requestData, options, billData)
        .then((result) => {
            console.log('data', result);
        })
        .catch((err) => {
            console.log("error", err)
        })
        .finally(()=> {
            console.log('end');
        }); 

        // request.post(options, function(err, httpResponse, body){ 
        //     if(err) {
        //         console.log(`err => ${err}`)
        //     } else {
        //         if(httpResponse.statusCode == 200) {
        //             const billLogSuccess = BillLogSuccess({billLogId: billId, paymentKey, billLogDate: body.approvedAt}),
        //             billLogDetail = BillLogDetail({billLogId: billId, step: 6});
        //             paymentDb.successBillLog(billId, billLogSuccess, billLogDetail)

        //             result.status = true;
        //             result.body = { success: true }
                    
        //         } else {
        //             // bill_log_detail step=4 insert
        //             const billLogDetail = BillLogDetail({billId, step: 4})
        //             paymentDb.insertBillLogDetail(billLogDetail);

        //             result.status = false;
        //             result.body = { success: false }
        //         }
        //     }
        // })

        return result;
        
    } catch (err) {
        console.log(err)
        throw err;
    }
}


async function failPayment(body){
    try {
        const {code, message, orderId} = body

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

async function insertTestData() {
    try {

        // const dbResult = await paymentDb.insertTestData();
        // result.status = true;
        // result.body = dbResult;
        let dbResult = {}


        await retry(0, requestData)
        .then((result) => {
            console.log('data', result);
            dbResult = result
        })
        .catch((err) => {
            console.log("error", err)
        })
        .finally(()=> {
            console.log('end');
        }); 


        result.status = true;
        result.body = { insertedId: dbResult.insertedId };


        return result

    } catch(err) {
        console.log(err)
        throw err;
    }
}


function requestData() {
    return new Promise ((resolve, reject) => {

        const dbResult = paymentDb.insertTestData();
        setTimeout(() => {}, 1000)
        if (dbResult) {
            resolve(dbResult);
        }
        reject(dbResult)
    });
}

function retry(n, requestData) {
    return new Promise ((resolve, reject) => {

        console.log('retry', n) 
        requestData()
        .then((data) => {
            resolve(data) 
        })
        .catch((error) => {
            if(n < 5){
                retry(n+1, requestData)
                .then(resolve)
                .catch(reject)
            } else {
                reject(new Error('fail retry'))
            }
        });
    });
}


// function requestData(options, billData) {
//     return new Promise ((resolve, reject) => {
//         const {billLogId, paymentKey, billLogDate} = billData
//         request.post(options, function(err, httpResponse, body){ 
            
//             if(err) {
//                 console.log(`err => ${err}`)
//                 reject(err)
//             } else {
//                 if(httpResponse.statusCode == 200) {
//                     const billLogSuccess = BillLogSuccess({billLogId, paymentKey, billLogDate}),
//                     billLogDetail = BillLogDetail({billLogId, step: 6});
//                     paymentDb.successBillLog(billLogId, billLogSuccess, billLogDetail)

//                     resolve()
//                 } else {
//                     // bill_log_detail step=4 insert
//                     const billLogDetail = BillLogDetail({billLogId, step: 4})
//                     paymentDb.insertBillLogDetail(billLogDetail);

//                     reject()
//                 }
//             }
//         })
//     });
// }


// function retry(n, requestData, options, billData) {
//     return new Promise ((resolve, reject) => {
//         console.log('retry', n) 
//         requestData(options, billData)
//         .then((data) => {
//             resolve(data) 
//         })
//         .catch((error) => {
//             if(n < 5){
//                 retry(n+1, requestData, options, billData)
//                 .then(resolve)
//                 .catch(reject)
//             } else {
//                 reject(new Error('fail retry'))
//             }
//         });
//     });
// }