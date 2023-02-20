import express from 'express';
const router = express.Router()
import payment from './payment.js'
import product from './product.js'
import store from './store.js'


router.get('/', (req, res) => {
    res.send("v1 success")
})

router.use('/payment', payment);

router.use('/product', product);

router.use('/store', store);


export default router;