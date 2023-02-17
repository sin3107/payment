import { payment_use_case } from "../use-cases/handle-payment.js";

const httpResponse = {
    headers: '',
    statusCode: '',
    body: ''
}

// ANCHOR status code list
const ok = '200';
const created = '201';
const badRequest = '400';
const unauthorized = '401';
const serverError = '500'

export {
    addProduct,
    successPayment,
    failPayment
}

async function addProduct(httpRequest){
    try {
        const { body, body: { user: { _id } } } = httpRequest;
        const { status, body: resBody } = await payment_use_case.addProduct(_id, body)
        
        httpResponse.statusCode = status ? created : badRequest;
        httpResponse.body = resBody;
        return httpResponse
    } catch (err) {
        console.log(err)
        httpResponse.statusCode = serverError;
        httpResponse.body = err.message;
        return httpResponse
    }
}

async function successPayment(httpRequest){
    try {
        const { params } = httpRequest;
        const { status, body } = await payment_use_case.successPayment(params)
        
        httpResponse.statusCode = status ? ok : badRequest;
        httpResponse.body = body;
        return httpResponse
    } catch (err) {
        console.log(err)
        httpResponse.statusCode = serverError;
        httpResponse.body = err.message;
        return httpResponse
    }
}

async function failPayment(httpRequest){
    try {
        const { params } = httpRequest;
        const { status, body } = await payment_use_case.failPayment(params)
        
        httpResponse.statusCode = status ? ok : badRequest;
        httpResponse.body = body;
        return httpResponse
    } catch (err) {
        console.log(err)
        httpResponse.statusCode = serverError;
        httpResponse.body = err.message;
        return httpResponse
    }
}