import express from 'express';
const router = express.Router()
import expressCallback from './express-callback/index.js';
import { 
    addProduct
 } from '../controllers/payment-controller.js';


router.get('/', (req, res) => {
    res.send("user success")
})

router.post('/payment', expressCallback(addProduct))


export default router;