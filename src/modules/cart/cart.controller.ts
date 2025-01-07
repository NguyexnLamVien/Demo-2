import { NextFunction, Request, Response } from "express";
import cartService from "./cart.service";


const addCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        const userId = req['userId'];

        const result = await cartService.addToCart({ ...body, cartUserId: userId });
        res.json({ message: 'Cart item added successfully', result });
    } catch (error) {
        next(error);
    }
};

const removeCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = req.params.id;
        const userId = req['userId'];
        const result = await cartService.deleteCartItem(userId, productId);
        res.json({ message: 'Cart item deleted successfully', result });
    } catch (error) {
        next(error);
    }
}

const updateCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req['userId'];
        const result = await cartService.updateCartItemQuantity(userId, productId, quantity);
        res.json({ message: 'Cart item updated quantity successfully', result });
    } catch (error) {
        next(error);
    }
}

const getCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req['userId'];
        const result = await cartService.getCart(userId);
        res.json(result);
    } catch (error) {
        next(error);
    }
}
export default { addCart, removeCart, updateCart, getCart };
