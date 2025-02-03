import mongoose, { Schema, Document, ObjectId } from "mongoose"
import { IProduct } from "./productModel";

const cartStatusEnum = ["active", "completed"];

export interface ICartItem{
    product:IProduct,
    unitPrice: any,
    quantity: number,
}
export interface ICart extends Document{
    userId: ObjectId | String,
    items: ICartItem[],
    totalAmount: Number,
    status : "active" | "completed"
}

const cartItemSchema: Schema = new Schema<ICartItem>({
    product:{type: Schema.Types.ObjectId, ref: 'products', required: true},
    unitPrice: {type: Number, required: true},
    quantity: {type: Number, required: true}
})

const cartSchema: Schema = new Schema<ICart>({
    userId: { type: Schema.Types.ObjectId, ref: 'users' , required: true},
    items: [cartItemSchema],
    totalAmount: {type: Number, required: true},
    status: {type:String , enum: cartStatusEnum ,required:true, default:"active"},
})

const cartModel = mongoose.model<ICart>('carts', cartSchema);
export default cartModel;
