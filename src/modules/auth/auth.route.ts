import { Application, Router } from 'express';
import authController from './auth.controller';
import { authenMiddleware } from '@core/middleware';
const authRouter = (app: Application) => {
    const path = 'auth';
    app.post(`/${path}/login`, authController.login);
    app.post(`/${path}/register`, authController.register);
    app.post(`/${path}/refresh-token`, authController.refreshToken);
    app.post(`/${path}/logout`, authenMiddleware, authController.logout);
    app.post(`/${path}/verify-email`, authController.verifyEmail);
    app.post(`/${path}/send-email`, authController.sendEmail);
    app.post(`/${path}/reset-password/:token`, authController.resetPassword);
    app.post(`/${path}/forgot-password`, authController.sendPasswordReset);
}

export default authRouter;
