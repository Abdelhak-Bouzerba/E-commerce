import express from 'express';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import { seedInitialeProducts } from './services/productService';

const app = express();
const port = 3001;
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/e-commerce')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));
//seed products to the database
seedInitialeProducts();

app.use('/users', userRoute);
app.use('/products', productRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

