import { NextFunction, Request, Response } from "express";
import authService from "./auth.service";

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await authService.registerUser(name, email, password);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        next(error);
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await authService.loginUser(email, password);
        res.json({ token, user });
    } catch (error) {
        next(error);
    }
};

const passwordReset = async (req: Request, res: Response, next: NextFunction) => {

}
export default { login, register, passwordReset };