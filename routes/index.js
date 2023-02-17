import express from 'express';
const router = express.Router()
import expressCallback from './express-callback/index.js';
import { 
    addPayment,
    successPayment,
    failPayment
 } from './controllers/payment-controller.js';


router.get('/', (req, res) => {
    res.send("user success")
})

router.post('/payment', expressCallback(addPayment))

router.post('/successPayment', expressCallback(successPayment))

router.post('/failPayment', expressCallback(failPayment))

export default router;