
import jwt from 'jsonwebtoken';


const generateAccessToken = (userId: string) => {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES as string });
}

const generateRefreshToken = (userId: string) => {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES as string });
}

const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
}

const generateResetPasswordToken = (email: string) => {
    return jwt.sign({ email }, process.env.JWT_TOKEN_SECRET as string, { expiresIn: '5m' });
}




export { generateAccessToken, generateRefreshToken, verifyToken, generateResetPasswordToken };   
