import { storeDb } from "../db_handler/index.js";
import errorMessage from "../helper/error.js"

const store_use_cases = {
    getStoreAndProduct
};

export {
    store_use_cases
}

const result = {
    status: false,
    body: null
}

async function getStoreAndProduct(id) {
    try {
        if(!id) {
            result.status = false
            result.body = errorMessage.nullError.idMissing
            return result
        }

        const dbResult = await storeDb.findStoreAndProduct(id)
        if(dbResult) {
            result.status = true
            result.body = dbResult
            return result
        }

        result.status = false
        result.body = {success: false, ...errorMessage.dbError.notFound}
        return result
    } catch(err) {
        throw err
    }
}