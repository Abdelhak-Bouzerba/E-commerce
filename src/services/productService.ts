import productModel from "../models/productModel"

//get all products from the database
export const getAllProducts = async () => {
    return await productModel.find();
}
// add a new product to the database
export const seedInitialeProducts = async () => {
    try {
        const products = [
        { title: "Wireless Headphones", image: "image1.jpg", price: 49, stock: 120 },
        { title: "Smart Watch", image: "image2.jpg", price: 99, stock: 50 },
        { title: "Laptop", image: "image3.jpg", price: 499, stock: 10 },
    ];
    const existingProduct = await getAllProducts();
    if ( existingProduct.length === 0) {
        await productModel.insertMany(products);
    }
    } catch(err) {
        console.error("cannot see database", err);
    }
}