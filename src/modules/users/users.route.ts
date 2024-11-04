import { Application, Router } from 'express';
import userController from '@modules/users/users.controller';
import { authenMiddleware, authorizationMiddleware } from '@core/middleware/index';

const userRouter = (app: Application) => {
    const path = 'users';

    app.get(`/${path}`, authenMiddleware, authorizationMiddleware, userController.getAll);
    app.delete(`/${path}/:id`, authenMiddleware, userController.deleteUser);
    app.put(`/${path}/:id`, authenMiddleware, userController.updateUser);
};


export default userRouter;
