import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IOrderItem {
    productTitle: String,
    productImage: String,
    unitPrice: Number,
    quantity: Number,
}

export interface IOrder extends Document {
    userId: ObjectId | string,
    orderItems: IOrderItem[],
    totalAmount: Number,
    address:string,
}

const orderItemSchema: Schema = new Schema<IOrderItem>({
    productTitle: { type: String, required: true },
    productImage: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
})

const orderSchema: Schema = new Schema<IOrder>({
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    orderItems: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    address: { type: String, required: true },
})

const orderModel = mongoose.model<IOrder>("orders", orderSchema);
export default orderModel;

