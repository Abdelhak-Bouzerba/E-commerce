import cartModel from "../models/cartModel";

interface createCartForUser{
    userId: string,
}
//create new cart for user
const createCartForUser = async ({userId} : createCartForUser) => {
    const cart = await cartModel.create({ userId, totalAmount: 0 })
    await cart.save();
    return cart;
}
//show the cart for user
export const cartServiceForUser = async ({userId} : createCartForUser) => {
    const cart = await cartModel.findOne({ userId, status: "active" })
    
    if (!cart) {
        return await createCartForUser({ userId });
    }
    return cart;
}
