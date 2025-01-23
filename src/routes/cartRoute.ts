import express, { Request } from "express";
import { addItemTocart, cartServiceForUser, checkout, clearCart, deleteItemFromCart, updateItemInCart } from "../services/cartService";
import validateJwt, { ExtendRequest } from "../middlwares/validateJwt";

const router = express.Router();
//get cart for the user
router.get("/", validateJwt, async (req : ExtendRequest, res) => {
    const userId = req.user._id;
    const cart = await cartServiceForUser({ userId })
    res.status(200).send(cart);
})
//add item to the cart
router.post('/items', validateJwt, async (req :ExtendRequest, res) => {
    const userId = req.user._id;
    const {productId,quantity } = req.body;
    const result = await addItemTocart({ userId, productId, quantity });
    res.status(201).send(result.data);
})
//update item in the cart
router.put('/items', validateJwt, async (req : ExtendRequest, res) => {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    const {statusCode , data} = await updateItemInCart({ userId, productId, quantity });
    res.status(statusCode).send(data);
})
//delete item from the cart
router.delete('/items/:productId', validateJwt, async (req : ExtendRequest , res) => {
    const userId = req.user._id;
    const  productId  = req.params.productId;
    const result = await deleteItemFromCart({ userId, productId });
    res.status(200).send(result.data);
})
//clear the cart
router.delete('/', validateJwt , async (req :ExtendRequest , res) => {
    const userId = req.user._id;
    const {statusCode , data} = await clearCart({ userId });
    res.status(statusCode).send(data);
})
//
router.post("/checkout", validateJwt, async (req: ExtendRequest, res) => {
    const userId = req?.user?._id;
    const { address } = req.body;
    const {statusCode , data} = await checkout({ userId , address });
    res.status(statusCode).send(data);
});
export default router;

