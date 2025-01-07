// import { NotFound } from "@core/types/error.response";
// import productsService from "@modules/product/products.service";
// import coursesService from "@modules/product/products.service";
// import { User } from "@modules/user/users.model";
// import { Application, NextFunction, Request, Response } from "express";

// const createProductByUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const userId = req.headers['userId'];
//         const user = await User.findById(userId).lean().select('_id');
//         if (!user) {
//             throw new NotFound('')
//         }
//         const data = req.body;
//         const newProduct = await productsService.createProduct(data);

//         res.send(newProduct);
//     } catch (error) {
//         next(error);
//     }
// }

// const createUserRouter = (app: Application) => {
//     app.get('/assign-product-for-user', createProductByUser);
// };

// export default createUserRouter;
