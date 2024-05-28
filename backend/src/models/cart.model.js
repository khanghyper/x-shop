import {model, Schema} from 'mongoose';

const cartSchema = new Schema({
    data: {
        type: Array(Object),
        default: []
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    collection: 'Carts'
});

export default model('Cart', cartSchema);