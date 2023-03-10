import express from "express";
const router = express.Router()
import expressCallback from "../express-callback/index.js"
import { 
    findProductMaxCount
} from "../controllers/product-controller.js"


router.get('/', (req, res) => {
    res.send("product")
})

router.get('/maxCount/:id', expressCallback(findProductMaxCount))

export default router;