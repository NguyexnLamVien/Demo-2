import { NextFunction, Request, Response } from "express";
import authService from "./auth.service";

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
        const userId = req.headers.userId as string;
        const user = await authService.logoutUser(userId);
        res.json({ message: 'User logged out successfully', user });
    } catch (error) {
        next(error);
    }
}

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.headers as { refreshToken: string };
    try {
        const accessToken = await authService.refreshAccessToken(refreshToken);
        res.json({ accessToken });
    } catch (error) {
        next(error);
    }
}

const passwordReset = async (req: Request, res: Response, next: NextFunction) => {

}
export default { login, register, passwordReset, logout, refreshToken };