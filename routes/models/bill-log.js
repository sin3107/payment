export default function buildBillLog(){
    return ({
        _id,
        userId,
        totalPrice,
        paymentNumber,
        paymentDate,
        paymentType,
        title
    })=> {
        if(!_id) _id = id;
        
        return Object.freeze({
            _id: String(_id),
            userId: String(userId),
            totalPrice: Number(totalPrice),
            paymentNumber: String(paymentNumber),
            paymentDate: String(paymentDate),
            paymentType: Number(paymentType),
            title: String(title)
        })
    }
}