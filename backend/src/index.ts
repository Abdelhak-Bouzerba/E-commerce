import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import cartRoute from './routes/cartRoute';
import { seedInitialeProducts } from './services/productService';

dotenv.config();

const app = express();
const port = 3001;
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL || '')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));
//seed products to the database
seedInitialeProducts();

app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/carts', cartRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

