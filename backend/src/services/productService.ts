import productModel from "../models/productModel"

//get all products from the database
export const getAllProducts = async () => {
    return await productModel.find();
}
// add a new product to the database
export const seedInitialeProducts = async () => {
    try {
        const products = [
            {title: "Dell laptop" , image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwsnV5I1Ex5SNA9bWWrPuBrBT3SWCxzZHV-w&s" , price: 500 , stock: 10},
            {title: "HP laptop" , image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNPkIzbCliA21Ho9XE-gmP2mHiHwubtJjlww&s" , price: 450 , stock: 20},
            {title: "Asus laptop" , image:"https://www.asus.com/media/Odin/Websites/global/Series/14.png" , price: 1000 , stock: 6},
    ];
    const existingProduct = await getAllProducts();
    if ( existingProduct.length === 0) {
        await productModel.insertMany(products);
    }
    } catch(err) {
        console.error("cannot see database", err);
    }
}