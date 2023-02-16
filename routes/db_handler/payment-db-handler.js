export default function makePaymentDb(makeDb) {
    return Object.freeze({
        getPaymentDb,
        insertBillLog,
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

    async function updateBillLog(BillLog) {

        const db = await makeDb()
        const session = await db.startSession();
        try {
            session.endSession();

            const ordersCollection = db.collection('payment');
            const { insertedId } = await ordersCollection.updateOne(BillLog).session(session);
            await session.commitTransaction();
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