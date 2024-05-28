import {model, Schema} from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        maxLength: 150,
        unique: true
    },
    name: {
        type: String,
        trim: true,
        maxLength: 150
    },
    address: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    collection: 'Users'
});

export default model('User', userSchema);