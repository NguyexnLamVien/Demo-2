import { BadRequest, Conflict, NotFound, Unauthorized } from "@core/types/error.response";
import { User } from "@modules/user/users.model";
import { comparePassword, hashPassword } from "@modules/util/bcrypt";
import { generateAccessToken, generateRefreshToken } from "@modules/util/generateToken";
import jwt from 'jsonwebtoken';
import { sendOTPEmailUtil } from '@modules/util/nodemailer';

const registerUser = async (name: string, email: string, password: string) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Conflict("Email already exists");
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ name, email, password: hashedPassword });
    return user;
};

const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) throw new NotFound('User not found');

    const isMatch = await comparePassword(password, user.password!);
    if (!isMatch) throw new Unauthorized('Invalid password');

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    await saveRefreshToken(user._id.toString(), refreshToken);

    return { accessToken, user };
};

const logoutUser = async (userId: string) => {
    if (!userId) throw new NotFound('User not found');
    return await User.findOneAndUpdate(
        { _id: userId },
        { refreshToken: null },
        { new: true }
    );
};

const saveRefreshToken = async (userId: string, refreshToken: string): Promise<void> => {
    await User.findOneAndUpdate({ _id: userId }, { refreshToken }, { new: true });
};

const refreshAccessToken = async (refreshToken: string) => {
    if (!refreshToken) {
        throw new Unauthorized('Refresh token is required');
    }

    try {
        // Verify refresh token
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET as string
        ) as { userId: string };

        // Check if user exists and token matches
        const user = await User.findById(decoded.userId);
        if (!user || user.refreshToken !== refreshToken) {
            throw new Unauthorized('Invalid refresh token');
        }

        // Generate new access token
        const newAccessToken = generateAccessToken(user._id.toString());

        return { accessToken: newAccessToken };
    } catch (error) {
        throw new Unauthorized('Invalid refresh token');
    }
};

const generateOTP = async () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    return { otp, otpExpiry };
};

const sendOTPEmail = async (email: string, otp: string, otpExpiry: Date) => {
    let user = await User.findOne({ email });
    if (!user) throw new BadRequest('User not found');
    if (user.isVerified === true) throw new BadRequest('User is already verified');
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
    await sendOTPEmailUtil(email, otp);
};

const sendResetPasswordEmail = async (email: string, token: string) => {
    await sendResetPasswordEmail(email, token);
}
export default { registerUser, loginUser, logoutUser, saveRefreshToken, refreshAccessToken, generateOTP, sendOTPEmail, sendResetPasswordEmail };
