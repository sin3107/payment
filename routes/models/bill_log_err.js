export default function buildBillLogError(){
    return ({
        paymentId,
        paymentErrorCode
    }) => {
        return Object.freeze({
            payment_id: Number(paymentId),
            payment_error_code: String(paymentErrorCode)
        })
    }
}