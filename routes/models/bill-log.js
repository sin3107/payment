export default function buildBillLog(){
    return ({
        memberId,
        paymentNumber,
        paymentType,
        paymentTitle,
        paymentTotalPrice
    })=> {
        return Object.freeze({
            member_id: Number(memberId),
            payment_number: String(paymentNumber),
            payment_type: String(paymentType),
            payment_title: String(paymentTitle),
            payment_total_price: Number(paymentTotalPrice)
        })
    }
}