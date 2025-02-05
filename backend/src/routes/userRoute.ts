import express from 'express';
import { getMyOrders, login, register } from '../services/userService';
import validateJwt, { ExtendRequest } from '../middlwares/validateJwt';

const router = express.Router();
//end point for registering a new user
router.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const { statusCode, data } = await register({ firstName, lastName, email, password });
        res.status(statusCode).send(data);
    } catch (err: any) {
        res.status(500).json(err.message);
    }
})
//end point for login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const { statusCode, data } = await login({ email, password });
        res.status(statusCode).json(data);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
})
//end point for get all orders
router.get('/my-orders',validateJwt, async (req:ExtendRequest, res,) => {
    try {
        const userId = req.user._id;
        const {data , statusCode} = await getMyOrders({ userId })
        res.status(statusCode).send(data);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
})
export default router;