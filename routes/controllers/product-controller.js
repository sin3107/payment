import { product_use_cases } from "../use-cases/handle-product.js"

const httpResponse = {
    headers: '',
    statusCode: '',
    body: ''
}

export {
    findProductList,
    findProduct,
    findProductMaxCount
}

// ANCHOR status code list
const ok = '200';
const created = '201';
const badRequest = '400';
const unauthorized = '401';
const serverError = '500'


async function findProductList(httpRequest) {
    try {
        const { params: {storeId} } = httpRequest;
        const { status, body } = await product_use_cases.getProductList(storeId)

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

async function findProduct(httpRequest) {
    try {
        const { params: { productId } } = httpRequest;
        const { status, body } = await product_use_cases.getProduct(productId)

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

async function findProductMaxCount(httpRequest) {
    try {
        const { body: { user: { _id } }, params: { productId } } = httpRequest;
        const { status, body } = await product_use_cases.getProductMaxCount(_id, productId)

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