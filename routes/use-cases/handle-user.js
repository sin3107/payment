import {memberDb} from '../db-handler/index.js'
import errorMessage from "../helper/error.js";

const member_use_cases = {
    getMember,
};

export {
    member_use_cases
};
const result ={
    status: false,
    body: null
}

async function getMember(id){
    try {
        if(!id){
            result.status = false
            result.body = errorMessage.nullError.idMissing
            return result
        }
        const dbResult = await memberDb.findMemberById(id)
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