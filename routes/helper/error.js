const unknownError = {
    message: "알 수 없는 오류가 발생하였습니다",
    code: "000" // NOTE SyntaxError: Octal literals are not allowed in strict mode.
}
// ANCHOR null checking
const idMissing = {
    message: "id가 없습니다",
    code: 100
}
const productMissing = {
    message: "상품이 없습니다.",
    code: 101
}

// ANCHOR format, syntax checking
const format = {
    message: "형태가 다름",
    code: 200
}

// ANCHOR DB checking
const userNotFound = {
    message: "해당 유저가 존재하지 않습니다.",
    code: 300
}
const productNotFound = {
    message: "해당 상품이 존재하지 않습니다.",
    code: 301
}


const paymentUserCancel = {
    message: "결제를 취소하셨습니다.",
    code: 500
}
const invalidCard = {
    message: "카드 정보가 바르지않습니다.",
    code: 501
} 
const failPayment = {
    message: "결제 실패.",
    code: 502
} 
const productMaxNum = {
    message: "재고가 부족합니다.",
    code: 503
} 


const error = {
    unknownError: unknownError,
    nullError: {
        idMissing,
        productMissing
    },
    syntaxError: {
        format
    },
    dbError: {
        userNotFound,
        productNotFound
    },
    paymentError: {
        paymentUserCancel,
        invalidCard,
        failPayment,
        productMaxNum
    }
}
export default error;