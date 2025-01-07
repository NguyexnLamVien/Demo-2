import { Application, Router } from 'express';
import productController from './products.controller';
import { authenMiddleware } from '@core/middleware';


const productRouter = (app: Application) => {
    const path = 'products';
    app.get(`/${path}/:id`, productController.getProduct);

    app.post(`/${path}`, authenMiddleware, productController.createProduct);
    app.get(`/${path}`, authenMiddleware, productController.getAllProducts);
    app.patch(`/${path}/:id`, authenMiddleware, productController.updateProduct);
    app.delete(`/${path}/:id`, authenMiddleware, productController.deleteProduct);
}
export default productRouter;
