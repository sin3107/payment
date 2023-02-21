import { ticket_use_case } from "../use-cases/handle-ticket.js";

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
    getMyTicket
}

async function getMyTicket(httpRequest) {
    try {
        const { body: { user: { _id } }, params } = httpRequest;
        const { status, body } = await ticket_use_case.getMyTicket(_id, params)
        httpResponse.statusCode = status ? ok : badRequest;
        httpResponse.body = body;
        return httpResponse
    } catch(err) {
        httpResponse.statusCode = serverError;
        httpResponse.body = err.message
        return httpResponse
    }
}
