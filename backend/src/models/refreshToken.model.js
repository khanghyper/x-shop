import {model, Schema} from 'mongoose';

const refreshTokenSchema = new Schema({
    token: {
        type: String,
        trim: true,
        unique: true
    }
}, {
    timestamps: true,
    collection: 'RefreshTokens'
});

export default model('RefreshToken', refreshTokenSchema);