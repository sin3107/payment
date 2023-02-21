import { ticketDb } from "../db_handler/index.js"
import errorMessage from "../helper/error.js"

const ticket_use_case = {
    getMyTicket
}

export {
    ticket_use_case
}
const result = {
    status: false,
    body: null
}

async function getMyTicket(id, body) {
    try { 
        const { yn } = body;
        const dbResult = await ticketDb.getMyTicket(id, yn);
        result.status = true
        result.body = dbResult
        return result

    } catch(err) {
        console.log(err)
        throw err;
    }
}