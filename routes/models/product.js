export default function buildProduct() {
    return ({
        storeId,
        productName,
        productContents,
        productPrice,
        productOrderNumber,
        productMaxCount
    }) => {
        return Object.freeze({
            store_id: Number(storeId),
            product_name: String(productName),
            product_contents: String(productContents),
            product_price: Number(productPrice),
            product_order_number: Number(productOrderNumber),
            product_max_count: Number(productMaxCount)
        })
    }
}