import { Application } from "express";
import userRouter from '@modules/users/users.route';
import createUserRouter from '@feature/createProductByUser';
import authRouter from '@modules/auth/auth.route';
import courseRouter from "@modules/courses/courses.route";
import roleRouter from "@modules/role/role.route";
import RoleCollection from "@modules/role/role.collection";
import casbin from "@config/casbin";

const routes = async (app: Application) => {
    userRouter(app);
    courseRouter(app);
    createUserRouter(app);
    authRouter(app);
    roleRouter(app);

    setTimeout(async () => {
        try {
            
        } catch (error) {
            console.error(error);
        }
    }, 1000);

}

export default routes;

