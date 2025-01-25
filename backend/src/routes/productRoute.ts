import express from 'express';
import { getAllProducts } from '../services/productService';

const router = express.Router();

//end point to get all products
router.get('/', async (req, res) => {
    try {
        const product = await getAllProducts();
        res.status(200).send(product);
    } catch (err : any) {
        res.status(500).send(err.message);
    }
})

export default router;