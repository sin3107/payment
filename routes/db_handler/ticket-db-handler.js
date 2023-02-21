export default function makeTicketDb(makeDb) {
    return Object.freeze({
        getMyTicket
    })

    async function getMyTicket(id, yn) {
        try {
            const db = await makeDb().collection('ticket')
            const result = await db.aggregate(
                [
                    {
                        $match: {
                            "member_id": id,
                            "yn": yn
                        }
                    },
                    {
                        $lookup: {
                            from: "store",
                            localField: "store_id",
                            foreignField: "store_id",
                            as: "store_info"
                        }
                    }
                ]); 
            let arr = []
            await result.forEach(item => arr.push(item))
            return arr
        } catch(err) {
            console.log(err)
            throw err
        }
    }

}