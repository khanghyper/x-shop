import { StatusCodes } from "http-status-codes"
import ApiError from "../core/error.response.js"
import UserServices from "./user.service.js"
import { hashPassword, comparePassword, genPairTokens } from "../utils/index.js";
import userModel from "../models/user.model.js";
import cartModel from "../models/cart.model.js";


export default class AuthServices {
    static register = async (user) => {
        try {
            const foundUsers = await userModel.findOne({ username: user.username });
            if (foundUsers) throw new ApiError(StatusCodes.BAD_REQUEST, 'Tài khoản đã tồn tại!');


            const passwordHashed = await hashPassword(user.password);
            const createUser = await userModel.create({ ...user, password: passwordHashed });

            const createCart = await cartModel.create({user: createUser._id, data: []});

            const { accessToken, refreshToken } = genPairTokens({
                id: createUser._id,
                username: createUser.username,
                name: createUser.name,
                address: createUser.address,
                email: createUser.email,
                isAdmin: createUser.isAdmin,
            })

            return {
                username: createUser.username,
                name: createUser.name,
                address: createUser.address,
                email: createUser.email,
                _id: createUser._id,
                isAdmin: createUser.isAdmin,
                accessToken: accessToken
            }

        } catch (error) {
            throw error
        }
    }

    static login = async (payload) => {
        try {
            const checkUser = await userModel.findOne({ username: payload.username });
            if (!checkUser) throw new ApiError(StatusCodes.NOT_FOUND, 'Wrong username!');

            const validPassword = await comparePassword(payload.password, checkUser.password)
            if (!validPassword) throw new ApiError(StatusCodes.NOT_FOUND, 'Wrong password!');

            const { accessToken, refreshToken } = genPairTokens({
                id: checkUser._id,
                username: checkUser.username,
                name: checkUser.name,
                address: checkUser.address,
                email: checkUser.email,
                isAdmin: checkUser.isAdmin,
            })

            

            return {
                id: checkUser._id,
                username: checkUser.username,
                name: checkUser.name,
                address: checkUser.address,
                email: checkUser.email,
                phone: checkUser.phone,
                isAdmin: checkUser.isAdmin, accessToken
            }
        } catch (error) {
            throw error;
        }
    }
}