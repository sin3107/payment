export default function makeCounterDb(makeDb) {
    return Object.freeze({
        getDbId
    })

    async function getDbId(key) {
        try {
            const db = await makeDb().collection('counter');
            return await db.findOne({ _id: key }, { $inc: { "seq" : 1 } })
        } catch(err) {
            console.log(err)
            throw err;
        } 
    }
}