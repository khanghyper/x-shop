import express from 'express';
import authRoutes from './auth.routes.js'
import userRoutes from './user.routes.js'
import productRoutes from './product.routes.js';
import cartRoutes from './cart.routes.js';
import orderRoutes from "./order.routes.js";
import categoryRoutes from "./category.routes.js";

const app = express();

app.use('/auth', authRoutes);
app.use('/user', userRoutes)
app.use('/product', productRoutes);
app.use('/category', categoryRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes)

export default app;