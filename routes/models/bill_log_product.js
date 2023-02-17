export default function buildBillLogProduct() {
    return ({
        paymentId,
        paymentProductTitle,
        paymentProductPrice
    }) => {
        return Object.freeze({
            payment_id: Number(paymentId),
            payment_product_title: String(paymentProductTitle),
            payment_product_price: Number(paymentProductPrice)
        })
    }
} 