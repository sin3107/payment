export default function makeProductDb(makeDb) {
    return Object.freeze({
        getProductDb,
        findProductById,
    })

    async function getProductDb() {
        try {
            const db = await makeDb();
            return db.collection('product');
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async function findProductById(id) {
        try {
            const db = await getProductDb();
            const query = {_id: id};
            const result = await db.findOne(query);
            return result;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

}
