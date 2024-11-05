import { Conflict, NotFound, Unauthorized } from "@core/types/error.response";
import { User } from "@modules/users/users.model";
import { comparePassword, hashPassword } from "@modules/utils/bcrypt";
import { generateAccessToken, generateRefreshToken } from "@modules/utils/generateToken";
import jwt from 'jsonwebtoken';

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

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new Unauthorized('Invalid password');

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    await saveRefreshToken(user._id.toString(), refreshToken);

    return { accessToken, user };
};

const logoutUser = async (userId: string) => {
    if (!userId) throw new NotFound('User not found');
    return await User.findOneAndUpdate({ _id: userId }, { refreshToken: null }, { new: true });
};

const saveRefreshToken = async (userId: string, refreshToken: string): Promise<void> => {
    await User.findOneAndUpdate({ _id: userId }, { refreshToken }, { new: true });
};

const refreshAccessToken = async (refreshToken: string) => {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as { userId: string };

    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) throw new Unauthorized('Invalid refresh token');

    const newAccessToken = generateAccessToken(user._id.toString());

    return { accessToken: newAccessToken };
}



export default { registerUser, loginUser, logoutUser, saveRefreshToken, refreshAccessToken };
