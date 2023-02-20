export default function makePaymentDb(makeDb) {
    return Object.freeze({
        getPaymentDb,
        insertBillLog,
        insertBillLogDetail,
        insertBillLogProduct,
        insertBillLogError,
        updateBillLog
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


    async function updateBillLog(query, update) {

        const db = await makeDb()
        const billLogCollection = db.collection('bill_log');
        const session = await db.startSession();
        session.startTransaction();
        try {
            const { modifiedCount } = await billLogCollection.updateOne({query}, {$set : {update}}, { session });
            await session.commitTransaction()
            return modifiedCount;
        } catch (err) {
            await session.abortTransaction();
            console.log(err);
            throw err;
        }finally {
            await session.endSession();
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