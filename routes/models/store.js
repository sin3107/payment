export default function buildStore() {
    return ({
        storeName,
        storeBusinessHour,
        storeAddress
    }) => {
        return Object.freeze({
            store_name: String(storeName),
            store_business_hour: String(storeBusinessHour),
            store_address: String(storeAddress)
        })
    }
}