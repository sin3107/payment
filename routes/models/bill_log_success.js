export default function buildBillLogSuccess() {
    return ({
        billLogId,
        paymentKey,
        billLogDate
    }) => {
        return Object.freeze({
            bill_log_id: Number(billLogId),
            payment_key: String(paymentKey),
            bill_log_date: new Date(billLogDate)
        })
    }
}