import { StatusCodes } from "http-status-codes";
import ApiError from "../core/error.response.js";
import jwt from 'jsonwebtoken';

export default class Verify {
    static verifyToken = async (req, res, next) => {
        try {
            const token = req.headers.token;
            if(!token) throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not authenticated!');
            
            const accessToken = token.split(' ').pop();
            jwt.verify(accessToken, process.env.SECRET_KEY_ACCESSTOKEN, (err, user) => {
                if(err) throw new ApiError(StatusCodes.FORBIDDEN, 'Token is not valid!');
                req.user = user;
                next();
            })
        } catch (error) {
            next(error)
        }
    }

    static verifyTokenAndAdminAuth = async (req, res, next) => {
        try {
            if(req.user.id === req.params.id || req.user.isAdmin) next();
            else throw new ApiError(StatusCodes.FORBIDDEN, 'Forbiden!')
        } catch (error) {
            next(error)
        }
    }
}