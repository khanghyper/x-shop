import express from 'express';
import Verify from '../middlewares/verify.middleware.js';
import UserController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', Verify.verifyToken, UserController.findAll);
router.get('/:id', Verify.verifyToken,Verify.verifyTokenAndAdminAuth , async (req, res, next) => {
    try {
        console.log(req.params.id);
    } catch (error) {
        next(error)
    }
})

router.get('/')



export default router;