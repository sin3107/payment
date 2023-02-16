const unknownError = {
    message: "알 수 없는 오류가 발생하였습니다",
    code: "000" // NOTE SyntaxError: Octal literals are not allowed in strict mode.
}
// ANCHOR null checking
const idMissing = {
    message: "id가 없습니다",
    code: 100
}

// ANCHOR format, syntax checking
const format = {
    message: "형태가 다름",
    code: 200
}

// ANCHOR DB checking
const notFound = {
    message: "DB에 해당하는 데이터가 없습니다.",
    code: 300
}

const error = {
    unknownError: unknownError,
    nullError: {
        idMissing
    },
    syntaxError: {
        format
    },
    dbError: {
        notFound
    }
}
export default error;