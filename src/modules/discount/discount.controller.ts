import { NextFunction, Request, Response } from "express";
import discountService from "./discount.service";
import { CREATED, OK } from "@core/types/success.response";


const createDiscountController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await discountService.createDiscount(req.body);
        new CREATED({
            message: 'Tạo mã giảm giá thành công',
            metadata: result
        }).send(res);
    } catch (error) {
        next(error);
    }
}

const deleteDiscountController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await discountService.deleteDiscount(req.params.id);
        new OK({
            message: 'Delete discount successfully',
            metadata: result
        }).send(res);
    } catch (error) {
        next(error);
    }
}

const getAllDiscountCodesWithProductsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await discountService.getAllDiscountCodesWithProducts();
        res.json(result);
    } catch (error) {
        next(error);
    }
}

const getAllDiscountController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.headers['userId'];
        const { page, limit, sortBy, isActive, search }: any = req.query;

        const result = await discountService.getAllDiscount({
            userId,
            page: parseInt(page),
            limit: parseInt(limit),
            sortBy,
            isActive,
            search
        });
        res.json(result);
    } catch (error) {
        next(error);
    }
}

const getDiscountAmountController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.headers;
        const { discountCode, totalOrder } = req.body;

        const result = await discountService.getDiscountAmount(
            userId as string,
            discountCode,
            totalOrder
        );
        new OK({
            message: 'Discount Code apply successfully',
            metadata: result
        }).send(res);
    } catch (error) {
        next(error);
    }
}

export default {
    createDiscountController,
    deleteDiscountController,
    getAllDiscountCodesWithProductsController,
    getAllDiscountController,
    getDiscountAmountController
};