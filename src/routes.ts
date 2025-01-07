import { Application } from "express";
import userRouter from '@modules/user/users.route';
import authRouter from '@modules/auth/auth.route';
import roleRouter from "@modules/role/role.route";
import productRouter from "@modules/product/products.route";
import cartRouter from "@modules/cart/cart.route";
import discountRouter from "@modules/discount/discount.route";

const routes = async (app: Application) => {
    userRouter(app);
    productRouter(app);
    authRouter(app);
    roleRouter(app);
    cartRouter(app);
    discountRouter(app);

    // createUserRouter(app);

}

export default routes;

