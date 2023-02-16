import {config} from 'dotenv'
import { MongoClient } from 'mongodb';
import makeUserDb from './user-db-handler.js'
import makeProductDb from './product-db-handler.js'
import makePaymentDb from './payment-db-handler.js'

config();

const url = process.env.MONGO_DB_URL;
const dbName = process.env.XROS_DB_NAME;

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

async function makeDb(){
    try {
        await client.connect()
        const db = client.db(dbName);
        return db
    } catch (error) {
        console.log(error)
    }
}
const userDb = makeUserDb(makeDb)
const productDb = makeProductDb(makeDb)
const paymentDb = makePaymentDb(makeDb)


db.getMongo().startSession()
session.getDatabase("users").friends;
session.startTransaction();

session.abortTransaction();

session.commitTransaction();

export {
    userDb, productDb, paymentDb,
    makeDb
}