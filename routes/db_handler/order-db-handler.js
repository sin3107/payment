export default function makeOrderDb(makeDb) {
    return Object.freeze({
        getOrderDb,
    })

    async function getOrderDb() {
        try {
            const db = await makeDb();
            return db.collection('user');
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

}