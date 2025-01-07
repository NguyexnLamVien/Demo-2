import { NextFunction, Request, Response } from 'express';
import { NotFound } from '@core/types/error.response';
import ProductsService from './products.service';

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;
    const body = req.body;
    const newProduct = await ProductsService.createProduct(body, userId as string);
    res.json({ message: 'Product created successfully', newProduct });
  } catch (error) {
    next(error);
  }
};


const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const Product = await ProductsService.getProductById(req.params.id);
    if (!Product) throw new NotFound('Product not found');
    res.json(Product);
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.query
    const Products = await ProductsService.getAllProducts(data);
    res.json(Products);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedProduct = await ProductsService.updateProduct(req.params.id, req.body);
    if (!updatedProduct) throw new NotFound("Product not found");

    res.json({ message: 'Product updated successfully', Product: updatedProduct });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedProduct = await ProductsService.deleteProduct(req.params.id);
    if (!deletedProduct) throw new NotFound("Product not found");
    res.json({ message: 'Product deleted successfully', Product: deletedProduct });
  } catch (error) {
    next(error);
  }
};

export default { createProduct, getProduct, getAllProducts, updateProduct, deleteProduct };