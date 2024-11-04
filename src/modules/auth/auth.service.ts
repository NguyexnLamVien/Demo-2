import { Conflict, NotFound, Unauthorized } from "@core/types/errorHandler";
import { User } from "@modules/users/users.model";
import { comparePassword, hashPassword } from "@modules/utils/bcrypt";
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

    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN_SECRET!, { expiresIn: '1h' });
    return { token, user };
};

export default { registerUser, loginUser };
