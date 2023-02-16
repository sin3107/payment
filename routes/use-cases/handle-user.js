import {userDb} from '../db-handler/index.js'
import errorMessage from "../helper/error.js";

const user_use_cases = {
    getUser,
};

export {
    user_use_cases
};
const result ={
    status: false,
    body: null
}

async function getUser(id){
    try {
        if(!id){
            result.status = false
            result.body = errorMessage.nullError.idMissing
            return result
        }
        const dbResult = await userDb.findUserById(id)
        if(dbResult){
            result.status = true
            result.body = out(dbResult)
            return result
        }
        result.status = false
        result.body = {success: false, ...errorMessage.dbError.userNotFound}
        return result
    } catch (err) {
        throw err
    }
}