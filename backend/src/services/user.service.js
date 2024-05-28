import userModel from "../models/user.model.js"

export default class UserServices {
    static findAll = async (payload) => {
        return await userModel.find(payload);
    }
    static findOne = async (payload) => {
        return await userModel.findOne(payload);
    }
    static findById = async (id) => {
        return await userModel.findById(id);
    }
    static create = async (payload) => {
        return await userModel.create(payload);
    }
}