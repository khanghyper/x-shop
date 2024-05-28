import {model, Schema, Types} from 'mongoose';
import {ORDER_STATUS} from "../constant/index.js";



const orderSchema = new Schema({
    status: {
        type: Number,
        require: true,
        default: ORDER_STATUS['DANG_DUYET']
    },
    user: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    description: {
        type: String
    }
}, {
    timestamps: true,
    collection: 'Orders'
});

export default model('Order', orderSchema);