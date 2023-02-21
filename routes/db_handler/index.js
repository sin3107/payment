import {config} from 'dotenv'
import { MongoClient } from 'mongodb';
import makeMemberDb from './member-db-handler.js'
import makeProductDb from './product-db-handler.js'
import makePaymentDb from './payment-db-handler.js'
import makeStoreDb from './store-db-handler.js';
import makeTicketDb from './ticket-db-handler.js';
import makeCounterDb from './counter-db-handler.js'

config();

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const url = `mongodb+srv://${dbUser}:${dbPass}@cluster0.h02pk1v.mongodb.net/?retryWrites=true&w=majority`;
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
const paymentDb = makePaymentDb(makeDb, client, dbName)
const storeDb = makeStoreDb(makeDb)
const ticketDb = makeTicketDb(makeDb)
const counterDb = makeCounterDb(makeDb)

export {
    memberDb, productDb, paymentDb, storeDb, ticketDb, counterDb,
    makeDb
}