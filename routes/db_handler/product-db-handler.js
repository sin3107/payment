export default function makeProductDb(makeDb) {
    return Object.freeze({
        findProductList,
        findProductById,
        findProductByIdAndMaxCount
    })

    async function findProductList(id) {
        try {
            const db = await makeDb().collection('product');
            const query = {store_id: id};
            const result = await db.findOne(query);
            let arr = []
            await result.forEach(item => arr.push(item))
            return arr
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async function findProductById(id) {
        try {
            const db = await makeDb().collection('product');
            const query = {_id: id};
            const result = await db.findOne(query);
            return result;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async function findProductByIdAndMaxCount(id, productNumber) {
        try {
            const db = await makeDb().collection('product');
            const query = { product_id: id, product_max_count: { $lte: productNumber } };
            const result = await db.findOne(query);
            return result;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

}
