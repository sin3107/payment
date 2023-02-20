export default function buildTicket(){
    return ({
        memberId,
        productId,
        billLogProductId,
        qrUrlConnectionCode
    }) => {
        return Object.freeze({
            member_id: Number(memberId),
            product_id: Number(productId),
            bill_log_product_id: Number(billLogProductId),
            qr_url_connection_code: String(qrUrlConnectionCode)
        })
    }
}