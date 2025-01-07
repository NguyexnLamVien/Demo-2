import { Application, Router } from 'express';
import { authenMiddleware, closureFuntion } from '@core/middleware/index';
import userController from '@modules/user/users.controller';

const userRouter = (app: Application) => {
    const path = 'users';

    app.get(`/${path}`, userController.getAll);
    app.delete(`/${path}/:id`, authenMiddleware, userController.deleteUser);
    app.put(`/${path}/:id`, authenMiddleware, userController.updateUser);
};


export default userRouter;
