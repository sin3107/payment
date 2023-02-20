export default function buildBillLogDetail(){
    return ({
        billLogId,
        billLogStep
    }) => {
        return Object.freeze({
            bill_log_id: String(billLogId),
            bill_log_step: Number(billLogStep)
        })
    }
}