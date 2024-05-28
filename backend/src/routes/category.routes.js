import {Router} from 'express';
import categoryModel from "../models/category.model.js";

const router = Router();

router.get('/', async (req, res, next) => {
    try{
        const categories = await categoryModel.find({});
        return res.status(200).json(categories);
    }catch (error) {
        next(error);
    }
});

export default router;