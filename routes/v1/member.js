import express from 'express';
const router = express.Router()
import expressCallback from '../express-callback';

router.get('/', (req, res) => {
    res.send("member success")
})

export default router;