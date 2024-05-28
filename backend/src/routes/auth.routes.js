import express from 'express';
import userModel from '../models/user.model.js'
import AuthController from '../controllers/auth.controller.js';
import ApiError from '../core/error.response.js'
import { StatusCodes } from 'http-status-codes'
import Validations from '../middlewares/validation.middleware.js';
import Verify from '../middlewares/verify.middleware.js';

const router = express.Router();

router.post('/login', Validations.login, AuthController.login)

// router.post('/register', Validations.register, AuthController.register);

router.post('/register', AuthController.register);

router.post('/refresh', AuthController.refresh);

router.post('/logout',Verify.verifyToken, AuthController.logout);

export default router;