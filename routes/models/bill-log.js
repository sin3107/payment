export default function buildBillLog() {
    return ({
        memberId,
        storeId,
        billLogType,
        billLogNumber,
        billLogTitle,
        billLogTotalPrice
    })=> {
        return Object.freeze({
            member_id: Number(memberId),
            store_id: Number(storeId),
            bill_log_type: String(billLogType),
            bill_log_number: String(billLogNumber),
            bill_log_title: String(billLogTitle),
            bill_log_total_price: Number(billLogTotalPrice)
        })
    }
}