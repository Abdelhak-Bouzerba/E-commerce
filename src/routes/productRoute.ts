import express from 'express';
import { getAllProducts } from '../services/productService';

const router = express.Router();

//end point to get all products
router.get('/', async (req,res) => {
    const product = await getAllProducts();
    res.status(200).send(product);
})

export default router;