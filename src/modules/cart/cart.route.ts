import { Application, Router } from 'express';
import cartController from './cart.controller';
import { authenMiddleware } from '@core/middleware';


const cartRouter = (app: Application) => {

    const path = 'carts'
    app.get(`/${path}`, authenMiddleware, cartController.getCart);
    app.post(`/${path}`, authenMiddleware, cartController.addCart);
    app.post(`/${path}/update-quantity`, authenMiddleware, cartController.updateCart);
    app.delete(`/${path}/:id`, authenMiddleware, cartController.removeCart);
}
export default cartRouter;
