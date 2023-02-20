import express from 'express';
const router = express.Router()
import v1 from './v1/index.js';

router.get('/', (req, res) => {
    res.send("routes success")
})

router.use('/v1', v1)


export default router;