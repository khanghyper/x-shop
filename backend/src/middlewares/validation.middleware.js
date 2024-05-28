import joi from 'joi';
import ApiError from '../core/error.response.js';
import {StatusCodes} from 'http-status-codes'

export default class Validations {
    static register = async (req, res, next) => {
        const userSchema = joi.object({
            username: joi.string().required().messages({
                'string.base': `Username should be a type of 'text'`,
                'string.empty': `Username cannot be an empty field`,
                'any.required': `Username is a required field`
              }),
            name: joi.string().trim().max(150),
            address: joi.string().trim(),
            email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            phone: joi.string().trim(),
            password: joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).messages({
                'string.pattern.base': 'password is not valid!',
                'any.only': 'không đúng'
            }),
            password1: joi.ref('password')
        }) .with('password', 'password1');

        try {
            const {value, error} = await userSchema.validate(req.body);
            if(error){
                let message = error.message === '"password1" must be [ref:password]' ? 'xác thực mật khẩu không đúng' : error.message;
                throw new ApiError(StatusCodes.CONFLICT,message);
            }
            const {password1, ...user} = value;
            req.user = user;
            next();
        } catch (error) {
            next(error);
        }
    }

    static login = async (req, res, next) => {
        const userSchema = joi.object({
            username: joi.string().required().messages({
                'string.base': `Username should be a type of 'text'`,
                'string.empty': `Username cannot be an empty field`,
                'any.required': `Username is a required field`
              }),
            password: joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).messages({
                'string.pattern.base': 'Mật khẩu không hợp lệ!',
            }),
        })

        try {
            const {value, error} = await userSchema.validate(req.body);
            if(error) throw new ApiError(StatusCodes.BAD_REQUEST,error.message);
            req.user = value;
            next();
        } catch (error) {
            next(error);
        }
    }
}