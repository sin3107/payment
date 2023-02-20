export default function makeMemberDb(makeDb) {
    return Object.freeze({
        findMemberById,
    })

    async function findMemberById(id){
        try {
            const db = await makeDb().collection('member')
            const query = { member_id: id }
            const result = await db.findOne(query)
            return result;
        } catch(err) {
            console.log(err)
            throw err
        }
    }
}