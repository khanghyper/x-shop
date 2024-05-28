import productModel from "../models/product.model.js";
import userModel from "../models/user.model.js";
import cartModel from "../models/cart.model.js";
import {StatusCodes} from "http-status-codes";
import ApiError from "../core/error.response.js";

export default class CartController {
    static getCart = async (req, res, next) => {
        try{
            const id = req.user.id;
            const cart = await cartModel.findOne({user: id});

            return res.status(200).json(cart.data);
        }catch (e) {
            next(e);
        }
    }

    static addCart = async (req, res, next) => {
        try {
            const userId = req.user.id;
            const foundCart = await cartModel.findOne({user: userId});
            const foundProduct = await productModel.findById(req.body.productId);
            if(!foundProduct) throw new ApiError(StatusCodes.NOT_FOUND, 'Khong tim thay san pham')

            let cart = [...foundCart.data];
            if(!cart.length) {
                if(!req.body.size){
                    cart.push({
                        productId: req.body.productId,
                        qty: req.body.qty,
                        price: foundProduct.price * (100 - foundProduct.promotion)/100,
                        image: foundProduct.images[0].url,
                        name: foundProduct.name
                    })
                }else{
                    cart.push({
                        productId: req.body.productId,
                        qty: req.body.qty,
                        price: foundProduct.price * (100 - foundProduct.promotion)/100,
                        image: foundProduct.images[0].url,
                        size: req.body.size,
                        name: foundProduct.name
                    })
                }

            }else{
                if(!req.body.size){
                    const index = cart.findIndex(item => item.productId === req.body.productId);
                    if(index !== -1){
                        cart[index].qty = cart[index].qty + req.body.qty;
                    }else {
                        cart.push({
                            productId: req.body.productId,
                            qty: req.body.qty,
                            price: foundProduct.price * (100 - foundProduct.promotion)/100,
                            image: foundProduct.images[0].url,
                            name: foundProduct.name
                        })
                    }
                }else{
                    const index = cart.findIndex(item => item.productId === req.body.productId && item.size === req.body.size);
                    if(index !== -1){
                        cart[index].qty = cart[index].qty + req.body.qty;
                    }else {
                        cart.push({
                            productId: req.body.productId,
                            qty: req.body.qty,
                            price: foundProduct.price * (100 - foundProduct.promotion)/100,
                            image: foundProduct.images[0].url,
                            size: req.body.size,
                            name: foundProduct.name
                        })
                    }
                }

            }
            const updateCart = await cartModel.findOneAndUpdate({user: userId}, {data: cart});
            const foundCart1 = await cartModel.findOne({user: userId});

            return res.status(200).json(foundCart1.data)
        } catch (error) {
            next(error);
        }
    }

    static delCart = async (req, res, next) => {
        try {
            const userId = req.user.id;
            const foundCart = await cartModel.findOne({user: userId});

            let index = +req.params.index;
            let cart = [...foundCart.data];
            if(!cart.length) throw new ApiError(StatusCodes.BAD_REQUEST, 'Gio hang trong!');
            if(index > cart.length + 1) throw new ApiError(StatusCodes.NOT_FOUND, 'Khong ton tai san pham trong gio hang');

            cart.splice(index, 1);
            const updateCart = await cartModel.findOneAndUpdate({user: userId}, {data: cart});
            return res.status(200).json(cart);

        } catch (error) {
            next(error);
        }
    }

    static addQty = async (req, res, next) => {
        try{
            const userId = req.user.id;
            const foundCart = await cartModel.findOne({user: userId});

            let index = +req.params.index;
            let cart = [...foundCart.data];
            if(!cart.length) throw new ApiError(StatusCodes.BAD_REQUEST, 'Gio hang trong!');
            if(index > cart.length + 1) throw new ApiError(StatusCodes.NOT_FOUND, 'Khong ton tai san pham trong gio hang');

            cart[index].qty = cart[index].qty + 1;
            const updateCart = await cartModel.findOneAndUpdate({user: userId}, {data: cart});
            return res.status(200).json(cart);

        }catch (e) {
            next(e);
        }
    }

    static minusQty = async (req, res, next) => {
        try{
            const userId = req.user.id;
            const foundCart = await cartModel.findOne({user: userId});

            let index = +req.params.index;
            let cart = [...foundCart.data];
            if(!cart.length) throw new ApiError(StatusCodes.BAD_REQUEST, 'Gio hang trong!');
            if(index > cart.length + 1) throw new ApiError(StatusCodes.NOT_FOUND, 'Khong ton tai san pham trong gio hang');

            cart[index].qty = cart[index].qty - 1;
            if(!cart[index].qty){
                cart.splice(index, 1);
            }

            const updateCart = await cartModel.findOneAndUpdate({user: userId}, {data: cart});
            return res.status(200).json(cart);

        }catch (e) {
            next(e);
        }
    }
}