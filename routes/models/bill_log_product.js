export default function buildBillLogProduct() {
    return ({
        billLogId,
        productId,
        billLogProductName,
        billLogProductPrice
    }) => {
        return Object.freeze({
            bill_log_id: Number(billLogId),
            product_id: Number(productId),
            bill_log_product_name: String(billLogProductName),
            bill_log_product_price: Number(billLogProductPrice)
        })
    }
} 