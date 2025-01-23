import cartModel from "../models/cartModel";
import productModel from "../models/productModel";

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

interface addItemToCart {
    userId: string,
    productId: any,
    quantity: any,
}
//add new item to the cart
export const addItemTocart = async({userId, productId, quantity}: addItemToCart) => {
    const cart = await cartServiceForUser({ userId });
    const existingItem = cart.items.find((p) => p.product.toString() === productId)
    if (existingItem) {
        return { data: "item already exists", statusCose: 404 };
    }
    //fetch product from database
    const product = await productModel.findById(productId);
    if (!product) {
        return { data:"product not found" , statusCode:400}
    }
    if (Number(product.stock) < quantity) {
        return {data:"product out of stock", statusCode:400}
    }
    cart.items.push({ product: productId, unitPrice: product.price, quantity });
    cart.totalAmount = Number(cart.totalAmount) + Number(product.price) * quantity;
    const updatedCart = await cart.save();
    return { data: updatedCart, statusCode: 201 };
}

//update item in the cart
export const updateItemInCart = async ({ userId, productId, quantity }: addItemToCart) => {
    const cart = await cartServiceForUser({ userId });
    const existingItem = cart.items.find((p) => p.product.toString() === productId)
    if (!existingItem) {
        return { data: "item not found", statusCode: 400 };
    }

    const product = await productModel.findById(productId);
    if (!product) {
        return { data:"product not found" , statusCode:400}
    }
    if (Number(product.stock) < quantity) {
        return {data:"product out of stock", statusCode:400}
    }

    const otherCartItem = cart.items.filter((p) => p.product.toString() !== productId);
    let total = otherCartItem.reduce((sum, product) => {
        sum += Number(product.quantity) * Number(product.unitPrice);
        return sum;
    }, 0);
    existingItem.quantity = quantity;
    total += existingItem.quantity * existingItem.unitPrice;
    cart.totalAmount = total;
    const updateCart = cart.save();
    return { data: updateCart, statusCode: 201 };
}

//delete item from the cart
interface deleteItemFromCart {
    userId: string,
    productId: any,
}
export const deleteItemFromCart = async({ userId, productId }:deleteItemFromCart) => {
    const cart = await cartServiceForUser({ userId });

    const existingItem = cart.items.find((p) => p.product.toString() === productId)
    if (!existingItem) {
        return { data: "item does not exist", statusCose: 404 };
    }

    const otherCartItem = cart.items.filter((p) => p.product.toString() !== productId);

    let total = otherCartItem.reduce((sum, product) => {
        sum += Number(product.quantity) * Number(product.unitPrice);
        return sum;
    }, 0);
    cart.items = otherCartItem;
    cart.totalAmount = total;
    const updateCart = cart.save();
    return { data: updateCart, statusCode: 201 };
}
//delte all items from the cart
export const clearCart = async ({ userId }: createCartForUser) => {
    const cart = await cartServiceForUser({ userId })
    cart.items = [];
    cart.totalAmount = 0;
    const updatedCart = await cart.save();
    return { data: updatedCart, statusCode: 201 };
}; 

