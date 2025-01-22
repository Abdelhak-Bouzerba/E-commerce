import express, { Request } from "express";
import { cartServiceForUser } from "../services/cartService";
import validateJwt, { ExtendRequest } from "../middlwares/validateJwt";

const router = express.Router();
//
router.get("/", validateJwt, async (req : ExtendRequest, res) => {
    const userId = req.user._id;
    const cart = await cartServiceForUser({ userId })
    res.status(200).send(cart);
})


export default router;

