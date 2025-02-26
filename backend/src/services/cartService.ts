import cartModel from "../models/cartModel";
import orderModel, { IOrderItem } from "../models/orderModel";
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
interface cartServiceForUser{
    userId: string,
    populateProduct?:boolean,
}
//show the cart for user
export const cartServiceForUser = async ({userId , populateProduct} : cartServiceForUser) => {
    let cart;
    if (productModel) {
        cart = await cartModel.findOne({ userId, status: "active" }).populate('items.product');
    } else {
        cart = await cartModel.findOne({ userId, status: "active" });
    }
    
    if (!cart) {
        return await createCartForUser({ userId });
    }
    return cart;
}

interface addItemToCart {
    userId: string,
    productId: any,
    quantity: number,
}
//add new item to the cart
export const addItemTocart = async({userId, productId, quantity}: addItemToCart) => {
    const cart = await cartServiceForUser({ userId });
    const existingItem = cart.items.find((p) => p.product.id === productId)
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
    await cart.save();
    return { data:await cartServiceForUser({userId , populateProduct:true}), statusCode: 201 };
}

//update item in the cart
interface UpdateItemInCart {
  productId: string;
  quantity: number;
  userId: string;
}
export const updateItemInCart = async ({ userId, productId, quantity }: UpdateItemInCart) => {
    try {
        const cart = await cartServiceForUser({ userId });
        if (!cart) {
            console.error("Cart not found for user:", userId);
            return { data: "cart not found", statusCode: 400 };
        }

        const existingItem: any = cart.items.find((p) => p.product.id === productId);
        if (!existingItem) {
            return { data: "item not found", statusCode: 400 };
        }

        const product = await productModel.findById(productId);
        if (!product) {
            console.error("Product not found:", productId);
            return { data: "product not found", statusCode: 400 };
        }
        if (Number(product.stock) < quantity) {
            console.error("Product out of stock:", productId);
            return { data: "product out of stock", statusCode: 400 };
        }

        const otherCartItem = cart.items.filter((p) => p.product.id !== productId);
        let total = otherCartItem.reduce((sum, product) => {
            sum += Number(product.quantity) * Number(product.unitPrice);
            return sum;
        }, 0);

        existingItem.quantity = quantity;
        total += existingItem.quantity * existingItem.unitPrice;
        cart.totalAmount = total;

        await cart.save();
        console.log("Cart updated successfully for user:", userId);
        return { data: await cartServiceForUser({ userId, populateProduct: true }), statusCode: 201 };
    } catch (error) {
        console.error("Error updating item in cart:", error);
        return { data: "internal server error", statusCode: 500 };
    }
}

//delete item from the cart
interface deleteItemFromCart {
    userId: string,
    productId: string,
}
export const deleteItemFromCart = async({ userId, productId }:deleteItemFromCart) => {
    const cart = await cartServiceForUser({ userId });
    
    const existingItem = cart.items.find((p) => p.product.id === productId)
    if (!existingItem) {
    return { data:`item does not exist `, statusCode: 404 };
    }

    const otherCartItem = cart.items.filter((p) => p.product.id !== productId);

    let total = otherCartItem.reduce((sum, product) => {
        sum += Number(product.quantity) * Number(product.unitPrice);
        return sum;
    }, 0);
    cart.items = otherCartItem;
    cart.totalAmount = total;
    await cart.save();
    return { data:await cartServiceForUser({userId , populateProduct:true}), statusCode: 201 };
}
//delte all items from the cart
export const clearCart = async ({ userId }: createCartForUser) => {
    const cart = await cartServiceForUser({ userId })
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();
    return { data: await cartServiceForUser({userId , populateProduct:true}), statusCode: 201 };
};

//checkout the cart
interface order{
    userId: string,
    address:string,
}
export const checkout = async ({ userId, address }: order) => {
    if (!address) {
        return { data: "Please enter your address", statusCode: 400 }
    }
    const cart = await cartServiceForUser({ userId });
    const orderItems = [];
    for (const item of cart.items) {
        const product = await productModel.findById(item.product);
        if (!product) {
            return { data: "Product not found", statusCode: 400 };
        }

        const orderItem: IOrderItem = {
            productTitle: product.title,
            productImage: product.image,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
        }
        orderItems.push(orderItem);
    }
    const order = await orderModel.create({
        orderItems,
        totalAmount: cart.totalAmount,
        userId,
        address,
    });
    await order.save();
    //update the cart status to completed
    cart.status = "completed";
    await cart.save();

    return { data: order, statusCode: 200 };
};

