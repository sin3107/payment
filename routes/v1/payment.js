import express from 'express';
const router = express.Router();
import expressCallback from '../express-callback/index.js';
import { 
    addPayment,
    addBillLogDetail,
    successPayment,
    failPayment,
    addTestData
 } from '../controllers/payment-controller.js';


router.get('/', (req, res) => {
    res.send("payment")
})


router.post('/', expressCallback(addPayment))

// pg결제 진행 중 오류로 인한 거래중단 API 작성위치
router.post('/detailLog', expressCallback(addBillLogDetail))

router.post('/success', expressCallback(successPayment))

router.post('/fail', expressCallback(failPayment))

router.get('/test', expressCallback(addTestData))

export default router;