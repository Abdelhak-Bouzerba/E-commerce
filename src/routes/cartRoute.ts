import express, { Request } from "express";
import { addItemTocart, cartServiceForUser, updateItemInCart } from "../services/cartService";
import validateJwt, { ExtendRequest } from "../middlwares/validateJwt";

const router = express.Router();
//
router.get("/", validateJwt, async (req : ExtendRequest, res) => {
    const userId = req.user._id;
    const cart = await cartServiceForUser({ userId })
    res.status(200).send(cart);
})
//
router.post('/items', validateJwt, async (req :ExtendRequest, res) => {
    const userId = req.user._id;
    const {productId,quantity } = req.body;
    const result = await addItemTocart({ userId, productId, quantity });
    res.status(201).send(result.data);
})
//
router.put('/items', validateJwt, async (req : ExtendRequest, res) => {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    const {statusCode , data} = await updateItemInCart({ userId, productId, quantity });
    res.status(statusCode).send(data);
})

export default router;

