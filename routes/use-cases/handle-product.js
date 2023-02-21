import { productDb } from "../db_handler/index.js"
import errorMessage from "../helper/error.js";

const product_use_cases = {
    getProductList,
    getProduct,
    getProductMaxCount
};

export {
    product_use_cases
};
const result ={
    status: false,
    body: null
}

async function getProductList(storeId) {
    try { 
        if(!id) {
            result.status = false
            result.body = errorMessage.nullError.idMissing
            return result
        }

        const dbResult = await productDb.findProductList(storeId)
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


async function getProductMaxCount(memberId, productId) {
    try {
        if(!memberId || !productId) {
            result.status = false
            result.body = errorMessage.nullError.idMissing
            return result
        }

        const dbResult = await productDb.findProductByIdAndMaxCount(memberId, productId)
        if(dbResult) {
            result.status = true
            result.body = {success: true}
            return result
        }
        result.status = true
        result.body = {success: false}
        return result
    } catch (err) {
        throw err
    }
}