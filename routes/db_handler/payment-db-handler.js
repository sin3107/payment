import { Ticket } from "../models/index.js"

export default function makePaymentDb(makeDb, client, dbName) {
    return Object.freeze({
        getPaymentDb,
        insertBillLog,
        insertBillLogDetail,
        insertBillLogProduct,
        insertBillLogError,
        successBillLog,
        insertTestData
    })

    async function getPaymentDb() {
        try {
            const db = await makeDb();
            return db.collection('bill_log');
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async function insertBillLog(BillLog) {
        try {
            const db = await getPaymentDb();
            const { insertedId } = await db.insertOne(BillLog);
            return insertedId;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async function insertBillLogDetail(BillLogDetail) {
        try {
            const db = await makeDb().collection('bill_log_detail');
            const { insertedId } = await db.insertOne(BillLogDetail);
            return insertedId;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async function insertBillLogProduct(BillLogProduct) {
        try {
            const db = await makeDb().collection('bill_log_product');
            const { insertedId } = await db.insertOne(BillLogProduct);
            return insertedId;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async function insertBillLogError(BillLogError) {
        try {
            const db = await makeDb().collection('bill_log_error_code');
            const { insertedId } = await db.insertOne(BillLogError);
            return insertedId;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }


    async function successBillLog(billId, billSuccess, billDetail) {

        const db = client.db(dbName)
        const billLogCollection = db.collection('bill_log');
        const billLogSuccessCollection = db.collection('bill_log_success');
        const billLogDetailCollection = db.collection('bill_log_detail');
        const ticketCollection = db.collection('ticket');

        // transaction start
        const session = await client.startSession();
        session.startTransaction();
        try {

            // bill_log_success table
            // 승인 시 반환받은 값을 포함하여 (bill_log_id, payment_key, )
            await billLogSuccessCollection.insertOne(billSuccess, { session });
            
            // ticket = bill_log table & bill_log_product table
            // 두 table을 참조하여 ticket 발권
            const billLogData = await billLogCollection.aggregate(
                [
                    {
                        $match: {
                            "bill_log_id": billId,
                        }
                    },
                    {
                        $lookup: {
                            from: "bill_log_product",
                            localField: "bill_log_id",
                            foreignField: "bill_log_id",
                            as: "bill_log_product_list"
                        }
                    }
                ], { session })

            const { member_id, store_id, bill_log_product_list } = billLogData
            const ticketArray = []
            await Promise.all(
                bill_log_product_list.map(async (product) => {
                    const { bill_log_product_id } = product;
                    ticketArray.push(Ticket({ member_id, store_id, bill_log_product_id }))
                })
            )
            // ticket insert
            await ticketCollection.insertMany(ticketArray, { session })

            // detail insert
            await billLogDetailCollection.insertOne(billDetail, { session })

            // transcation end
            await session.commitTransaction()

        } catch (err) {
            await session.abortTransaction();
            console.log(err);
            throw err;
        }finally {
            await session.endSession();
        }
    }

    async function insertTestData() {

        try {
            const db = await client.db(dbName).collection('bill_log');

            const productDb = await client.db(dbName).collection('bill_log_product')
            
            const testCollection = await client.db(dbName).collection('test') 

            const dbResult = await testCollection.insertOne({_id: 25, name: '25'})
            return dbResult ? dbResult : null

            // await productDb.insertOne({_id: 4, bill_log_id: 2, product_id: 1, bill_log_product_name: "콜라", bill_log_product_price: "1000"});
            // await productDb.insertOne({_id: 5, bill_log_id: 2, product_id: 1, bill_log_product_name: "콜라", bill_log_product_price: "1000"});
            // await productDb.insertOne({_id: 6, bill_log_id: 2, product_id: 2, bill_log_product_name: "라면", bill_log_product_price: "2500"});
            // const { insertedId } = await db.insertOne({"_id": 1, "member_id": 1, "store_id": 1, "bill_log_parent_id": 0, "bill_log_type": "card", "bill_log_number": "20230221-00000001", "bill_log_title": "콜라 외 2건", "bill_log_total_price": 3000});
            
            // return insertedId

            // const result = await db.aggregate(
            //     [
            //         {
            //             $match: {
            //                 "bill_log_id": 1,
            //             }
            //         },
            //         {
            //             $lookup: {
            //                 from: "bill_log_product",
            //                 localField: "bill_log_id",
            //                 foreignField: "bill_log_id",
            //                 as: "bill_log_product_list"
            //             }
            //         }
            //     ])
            // let arr = []
            // await result.forEach(item => arr.push(item))
            // return arr
        } catch (err) {
            console.log("dbError: ", err);
            throw err;
        }
    }

}

// async function commitWithRetry(session) {
//     while (true) {
//         try {
//             session.commitTransaction(); // Uses write concern set at transaction start.
//             print("Transaction committed.");
//             break;
//         } catch (error) {
//             // Can retry commit
//             if (error.hasOwnProperty("errorLabels") && error.errorLabels.includes("UnknownTransactionCommitResult") ) {
//                 print("UnknownTransactionCommitResult, retrying commit operation ...");
//                 continue;
//             } else {
//                 print("Error during commit ...");
//                 throw error;
//             }
//        }
//     }
// }