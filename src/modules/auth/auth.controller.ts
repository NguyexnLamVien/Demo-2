import { NextFunction, Request, Response } from "express";
import authService from "./auth.service";
import { User } from "@modules/user/users.model";
import { BadRequest } from "@core/types/error.response";
import { generateResetPasswordToken } from "@modules/util/generateToken";
import { sendResetPasswordEmail } from './../util/nodemailer';
import { hashPassword } from "@modules/util/bcrypt";
import jwt from 'jsonwebtoken';

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await authService.registerUser(name, email, password);
        res.json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        next(error);
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const { accessToken, user } = await authService.loginUser(email, password);
        res.json({ accessToken, user });
    } catch (error) {
        next(error);
    }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        await authService.logoutUser(userId);
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        next(error);
    }
};

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req['userId'];
        const refreshToken = await User.findById(userId, 'refreshToken') as string;
        const result = await authService.refreshAccessToken(refreshToken);
        res.json(result);
    } catch (error) {
        next(error);
    }
};


const sendEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;
        if (!email) throw new BadRequest('Email is required');
        const { otp, otpExpiry } = await authService.generateOTP();
        await authService.sendOTPEmail(email, otp, otpExpiry);
        res.json({ message: 'OTP sent successfully' });
    } catch (error) {
        next(error);
    }
}

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            throw new BadRequest('Email and OTP are required');
        }

        const user = await User.findOne({ email });
        if (!user) throw new BadRequest('User not found');

        if (user.otp !== otp) {
            throw new BadRequest('Invalid OTP');
        }

        if (new Date() > user.otpExpiry!) throw new BadRequest('OTP has expired');

        user.isVerified = true;
        user.verifiedAt = new Date();
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.json({ message: 'Account verified successfully' });
    } catch (error) {
        next(error);
    }
}


const sendPasswordReset = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const user = User.findOne(email);
    if (!user) throw new BadRequest('User not found');
    const token = await generateResetPasswordToken(email);

    try {
        await sendResetPasswordEmail(email, token);
        res.json('Reset password email sent to ' + email);
    } catch (error) {
        next(error);
    }
}

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;
    const { newPassword } = req.body;
    if (!token || !newPassword) throw new BadRequest('Token and new password are required');
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET as string) as { email: string };
        const user = await User.findOne({ email: decoded.email });
        if (!user) throw new BadRequest('User not found');

        user.password = await hashPassword(newPassword);
        await user.save();

        res.json('Password reset successfully.');
    } catch (error) {
        next(error);
    }
}


export default { login, register, sendPasswordReset, logout, refreshToken, verifyEmail, sendEmail, resetPassword };    