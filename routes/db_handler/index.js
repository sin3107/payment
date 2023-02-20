import {config} from 'dotenv'
import { MongoClient } from 'mongodb';
import makeMemberDb from './member-db-handler.js'
import makeProductDb from './product-db-handler.js'
import makePaymentDb from './payment-db-handler.js'
import makeStoreDb from './store-db-handler.js';

config();

const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;

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
const memberDb = makeMemberDb(makeDb)
const productDb = makeProductDb(makeDb)
const paymentDb = makePaymentDb(makeDb)
const StoreDb = makeStoreDb(makeDb)

export {
    memberDb, productDb, paymentDb, StoreDb,
    makeDb
}