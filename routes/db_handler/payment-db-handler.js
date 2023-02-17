export default function makePaymentDb(makeDb) {
    return Object.freeze({
        getPaymentDb,
        insertBillLog,
        insertBillLogDetail,
        insertBillLogError,
        updateBillLog
    })

    async function getPaymentDb() {
        try {
            const db = await makeDb();
            return db.collection('payment');
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
            const db = await makeDb().collection('payment_detail');
            const { insertedId } = await db.insertOne(BillLogDetail);
            return insertedId;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }


    async function insertBillLogError(BillLogError) {
        try {
            const db = await makeDb().collection('payment_error_code');
            const { insertedId } = await db.insertOne(BillLogError);
            return insertedId;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }


    async function updateBillLog(query, update) {

        const db = await makeDb()
        // db conntion부 가져오기


        // 세션 실행
        const session = await db.startSession();
        try {
            const ordersCollection = db.collection('payment');
            const { insertedId } = await ordersCollection.updateOne({query}, {$set : {update}}, { session });
            await commitWithRetry(session);
            return insertedId;
        } catch (err) {
            console.log(err);
            await session.abortTransaction();
            throw err;
        }finally {
            await session.endSession();
        }
    }
}

async function commitWithRetry(session) {
    while (true) {
        try {
            session.commitTransaction(); // Uses write concern set at transaction start.
            print("Transaction committed.");
            break;
        } catch (error) {
            // Can retry commit
            if (error.hasOwnProperty("errorLabels") && error.errorLabels.includes("UnknownTransactionCommitResult") ) {
                print("UnknownTransactionCommitResult, retrying commit operation ...");
                continue;
            } else {
                print("Error during commit ...");
                throw error;
            }
       }
    }
}