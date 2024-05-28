import userModel from "../models/user.model.js";
import AuthServices from "../services/auth.service.js";
import { comparePassword, genPairTokens, hashPassword } from "../utils/index.js";
import SuccessResponse from '../core/success.response.js'
import refreshTokenModel from "../models/refreshToken.model.js";
import ApiError from "../core/error.response.js";
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken'

export default class AuthController {
    static register = async (req, res, next) => {
        try {
            const rs = await AuthServices.register(req.body);
            return res.status(200).json(rs);
        } catch (error) {
            next(error);
        }
    }

    static login = async (req, res, next) => {
        try {
            const checkUser = await userModel.findOne({ username: req.user.username });
            if (!checkUser) throw new ApiError(StatusCodes.NOT_FOUND, 'Wrong username!');

            const validPassword = await comparePassword(req.user.password, checkUser.password)
            if (!validPassword) throw new ApiError(StatusCodes.NOT_FOUND, 'Wrong password!');

            const { accessToken, refreshToken } = genPairTokens({
                id: checkUser._id,
                username: checkUser.username,
                name: checkUser.name,
                address: checkUser.address,
                email: checkUser.email,
                isAdmin: checkUser.isAdmin,
            })

            await refreshTokenModel.create({ token: refreshToken });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                path: '/',
                sameSite: 'strict'
            })


            const { password, ...others } = checkUser._doc;

            return SuccessResponse.ok(res, { ...others, accessToken })
        } catch (error) {
            next(error)
            // console.log(error);
        }
    }

    static refresh = async (req, res, next) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not authenticated!');

            const foundRefreshToken = await refreshTokenModel.findOne({ token: refreshToken });
            if (!foundRefreshToken) throw new ApiError(StatusCodes.FORBIDDEN, 'You are not valid!');


            jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESHTOKEN, async (err, user) => {
                if (err) throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not authenticated!');
                await refreshTokenModel.findOneAndDelete({token: refreshToken})
                
                const {iat, exp, ...others} = user;

                const newAccessToken = jwt.sign(others, process.env.SECRET_KEY_ACCESSTOKEN, { expiresIn: '1d' });
                const newRefreshToken = jwt.sign(others, process.env.SECRET_KEY_REFRESHTOKEN, { expiresIn: '30d' });
                await refreshTokenModel.create({token: newRefreshToken});

                res.cookie('refreshToken', newRefreshToken, {
                    httpOnly: true,
                    secure: true,
                    path: '/',
                    sameSite: 'strict'
                });

                return SuccessResponse.ok(res, { accessToken: newAccessToken});
            })
        } catch (error) {
            next(error);
        }
    }

    static logout = async (req, res, next) => {
        res.clearCookie('refreshToken');
        await refreshTokenModel.findOneAndDelete({token: req.cookies.refreshToken});
        return SuccessResponse.ok(res, undefined);
    }

}


// fetch('http://localhost:4014/api/v1/auth/login',{
//     method: 'POST',
//     headers: {
//         "Content-Type": "application/json",
//     },
//     body: JSON.stringify({username: 'admin', password: 'khang123'})
// }).then(res => res.json()).then(data => console.log(data))