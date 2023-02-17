export default function buildBillLogDetail(){
    return ({
        paymentId,
        paymentStep
    }) => {
        return Object.freeze({
            payment_id: String(paymentId),
            payment_step: Number(paymentStep)
        })
    }
}