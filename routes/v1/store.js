import express from "express";
const router = express.Router()
import expressCallback from "../express-callback/index.js"
import { 
    findStoreAndProduct
} from "../controllers/store-controller.js"


router.get('/', (req, res) => {
    res.send("store")
})

router.get('/:id', expressCallback(findStoreAndProduct))

export default router;