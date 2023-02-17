export default function buildTicket(){
    return ({
        memberId,
        productId,
        paymentProductId,
        qrUrlConnectionCode
    }) => {
        return Object.freeze({
            member_id: Number(memberId),
            product_id: Number(productId),
            payment_product_id: Number(paymentProductId),
            qr_url_connection_code: String(qrUrlConnectionCode)
        })
    }
}