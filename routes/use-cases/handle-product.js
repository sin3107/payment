import {productDb} from '../db-handler/index.js'
import errorMessage from "../helper/error.js";

const product_use_cases = {
    findProductList,
    getProduct
};

export {
    product_use_cases
};
const result ={
    status: false,
    body: null
}

async function findProductList(id) {
    try { 
        if(!id) {
            result.status = false
            result.body = errorMessage.nullError.idMissing
            return result
        }

        const dbResult = await productDb.findProductList(id)
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

async function getProduct(id){
    try {
        if(!id){
            result.status = false
            result.body = errorMessage.nullError.idMissing
            return result
        }
        const dbResult = await productDb.findProductById(id)
        if(dbResult){
            result.status = true
            result.body = dbResult
            return result
        }
        result.status = false
        result.body = {success: false, ...errorMessage.dbError.notFound}
        return result
    } catch (err) {
        throw err
    }
}
