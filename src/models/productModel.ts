import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
    title: String,
    image: String,
    price: Number,
    stock: Number
}

const productSchema: Schema = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true , default:0}
})

const productModel = mongoose.model<IProduct>('products', productSchema);
export default productModel;