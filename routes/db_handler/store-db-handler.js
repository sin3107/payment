export default function makeStoreDb(makeDb) {
    return Object.freeze({
        findStoreAndProduct
    })

    async function findStoreAndProduct(id) {
        try {
            const db = await makeDb.collection('store')
            return db.aggregate(
                [
                    {
                        $match: {
                            "store_id": id,
                        }
                    },
                    {
                        $lookup: {
                            from: "store_img",
                            localField: "store_id",
                            foreignField: "store_id",
                            as: "store_img_list"
                        }
                    },
                    {
                        $lookup : {
                            from : "product",
                            localField : "store_id",
                            foreignField : "store_id",
                            as : "product_list"
                        }
                    },
                    {
                        $sort: {
                            "product_list.product_order_number": 1
                        }
                    }
                ])

        } catch(err) {
            console.log(err)
            throw err
        }
    }
}