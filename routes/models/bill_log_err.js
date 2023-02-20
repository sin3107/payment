export default function buildBillLogError(){
    return ({
        billLogId,
        billLogErrorCode,
        billLogErrorMessage
    }) => {
        return Object.freeze({
            bill_log_id: Number(billLogId),
            bill_log_error_code: String(billLogErrorCode),
            bill_log_error_message: String(billLogErrorMessage)
        })
    }
}