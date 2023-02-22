import express from 'express';
const router = express.Router();
import expressCallback from '../express-callback/index.js';
import { 
    getMyTicket
} from '../controllers/ticket-controller.js'

router.get('/:yn', expressCallback(getMyTicket)) 

export default router;