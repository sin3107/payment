export default function makeUserDb(makeDb) {
    return Object.freeze({
        getUserDb,
        findUserById,
    })

    async function getUserDb() {
        try {
            const db = await makeDb();
            return db.collection('user');
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async function findUserById(id){
        try {
            const db = await getUserDb()
            const query = {member_id: id}
            const result = await db.findOne(query)
            return result;
        } catch(err) {
            console.log(err)
            throw err
        }
    }
}