import { Router } from "express";
import productModel from "../models/product.model.js";
import userModel from '../models/user.model.js'
import Verify from '../middlewares/verify.middleware.js';
import CartController from "../controllers/cart.controller.js";

const router = Router();

router.get('/', Verify.verifyToken, CartController.getCart);
// router.get('/', CartController.getCart);

router.post('/', Verify.verifyToken, CartController.addCart);

router.delete('/del/:index', Verify.verifyToken, CartController.delCart);
router.post('/add-qty/:index', Verify.verifyToken, CartController.addQty);
router.post('/minus-qty/:index', Verify.verifyToken, CartController.minusQty);


export default router;