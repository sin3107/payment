import { store_use_cases } from "../use-cases/handle-store";

const httpResponse = {
    headers: '',
    statusCode: '',
    body: ''
}

export { 
    findStoreAndProduct
}

// ANCHOR status code list
const ok = '200';
const created = '201';
const badRequest = '400';
const unauthorized = '401';
const serverError = '500'


async function findStoreAndProduct(httpRequest) {
    try {
        const { params: { storeId } } = httpRequest;
        const { status, body } = await store_use_cases.getStoreAndProduct(storeId)

        httpResponse.statusCode = status? ok: badRequest;
        httpResponse.body = body;
        return httpResponse

    } catch(err) {
        console.log(err)
        httpResponse.statusCode = serverError;
        httpResponse.body = err.message;
        return httpResponse
    }
}