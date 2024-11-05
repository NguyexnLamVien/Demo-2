import { Application, Router } from 'express';
import authController from './auth.controller';
import { authenMiddleware } from '@core/middleware';
const authRouter = (app: Application) => {
    const path = 'auth';
    app.post(`/${path}/login`, authController.login);
    app.post(`/${path}/register`, authController.register);
    app.delete(`/${path}/logout`, authenMiddleware, authController.logout);
}

export default authRouter;
