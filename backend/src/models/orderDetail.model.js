import {model, Schema, Types} from 'mongoose';

const orderDetailSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Product'
    },
    qty: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    orderId: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Order'
    },
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    size: {
        type: String
    }
}, {
    timestamps: true,
    collection: 'OrderDetails'
});

export default model('OrderDetail', orderDetailSchema);