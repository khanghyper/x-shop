import express from 'express';
import 'dotenv/config';
import initRoutes from './src/routes/index.js';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mailroutes from './src/routes/mail.js'
import morgan from 'morgan'
import productModel from "./src/models/product.model.js";


const app = express();
const port = process.env.PORT || 3011;

mongoose.connect(`mongodb://localhost:27017/xshop`).then(_ => console.log('Connected Mongodb success'))
    .catch(err => console.log('Error connect'));

app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
}));
// app.use(cors({
//     credentials: true,
//     origin: "*",
// }));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true },
  }))



app.use('/api/v1', initRoutes);
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    console.log(error.stack)
    return res.status(statusCode).json({
        status: 'Error',
        MC: 0,
        MS: error.message || 'Error: Internal Server Error!'
    })
}) 


app.listen(port, () => {
    console.log(`listen on http://localhost:${port}`);
})