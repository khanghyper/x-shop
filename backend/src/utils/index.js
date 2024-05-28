import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const hashPassword = async(password) => {
    return await bcrypt.hash(password, 10);
}

export const comparePassword = async(password, passwordHashed) => {
    const match = await bcrypt.compare(password, passwordHashed);
    return match;
}

export const genPairTokens = (payload) => {
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY_ACCESSTOKEN, { expiresIn: '1d' });
    const refreshToken = jwt.sign(payload, process.env.SECRET_KEY_REFRESHTOKEN, { expiresIn: '1d' });

    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    }
}
