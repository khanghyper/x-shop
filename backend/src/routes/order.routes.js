import {Router} from 'express';
import ApiError from "../core/error.response.js";
import {StatusCodes} from "http-status-codes";
import Verify from "../middlewares/verify.middleware.js";
import userModel from "../models/user.model.js";
import orderModel from "../models/order.model.js";
import orderDetailModel from "../models/orderDetail.model.js";
import cartModel from "../models/cart.model.js";

const router = Router();


router.get('/', Verify.verifyToken, Verify.verifyTokenAndAdminAuth, async(req, res, next) => {
    try{
        const userId = req.user.id;
        const foundUser = await userModel.findById(userId);
        if(!foundUser) throw new ApiError(StatusCodes.NOT_FOUND, 'User is not found!');

        const orders = await orderModel.find().populate('userId', '_id name');

        return res.status(200).json(orders);
    }catch (error) {
        next(error);
    }
})
// router.get('/byUser', Verify)
router.post('/', Verify.verifyToken,  async (req, res, next) => {
    try {
        const userId = req.user.id;
        const foundCart = await cartModel.findOne({user: userId});
        let cart = [...foundCart.data]

        const createOrder = await orderModel.create({user: userId});

        for(let product of cart) {
            const createOrderDetail = await orderDetailModel.create({
                productId: product.productId,
                qty: product.qty,
                price: product.price,
                orderId: createOrder._id,
                size: product.size ? product.size : undefined,
                name: product.name,
                image: product.image
            })
        }
        await cartModel.findOneAndUpdate({user: userId}, {data: []});
        return res.status(200).json(1);
    }catch (error) {
        
    }
})

router.get('/by-user', Verify.verifyToken, async (req, res, next) => {
    try {
        const userId = req.user.id;

        const foundOrders = await orderModel.find({user: userId}).sort({createdAt: -1});
        let orderIds = [...foundOrders].map(item => ({id: item._id, createdAt: item.createdAt, status: item.status}));
        let orders = [];
        for (let orderId of orderIds){
            let order = await orderDetailModel.find({orderId: orderId.id});
            orders.push({
                ...orderId,
                order: [...order]
            })
        }

        return res.status(200).json(orders)
    }catch (e) {
        next(e);
    }
})

router.get('/:orderId',Verify.verifyToken, async (req, res, next) => {
    const userId = req.user.id;
    const orderId = req.params.orderId;

    const foundOrder = await orderModel.find({userId: userId, _id: orderId}).populate('userId');
    if(!foundOrder) throw new ApiError(StatusCodes.NOT_FOUND, 'Order is not found!');

    return res.status(200).json(foundOrder)
})

router.patch('/change-status/:orderId', Verify.verifyToken, Verify.verifyTokenAndAdminAuth, async (req, res, next) => {
    try{
        const orderId = req.params.orderId;
        const orderStatus = req.body.status;

        const foundOrder = await orderModel.findById(orderId);
        if(!foundOrder) throw new ApiError(NOT_FOUND, 'Order is not found!');

        await foundOrder.updateOne({status: orderStatus});
        return res.status(200).json(foundOrder);
    }catch (error){

    }
})

export default  router;

