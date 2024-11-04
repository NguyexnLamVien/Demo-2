import { Application, Router } from 'express';
import authController from './auth.controller';
const authRouter = (app: Application) => {
    const path = 'auth';
    app.post(`/${path}/login`, authController.login);
    app.post(`/${path}/register`, authController.register);
}

export default authRouter;
