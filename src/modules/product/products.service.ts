

import { BadRequest, Conflict, Forbidden, NotFound } from '@core/types/error.response';
import { Product, IProduct, Clothing, Electronic } from './products.model';
import inventoriesController from '@modules/inventory/inventories.controller';
import { model } from 'mongoose';
import { covertToObjectId } from '@modules/util/mongooses';
const createProduct = async (data: IProduct, userId: string) => {

  const { name, price, type, productAttribute } = data;
  if (!name || !price) throw new BadRequest(`Name and price are required`);

  if (!['Clothing', 'Electronic'].includes(type)) throw new BadRequest('Invalid product type');

  const newProduct = await Product.create({ ...data, createByUser: userId });


  switch (type) {
    case 'Clothing':
      if (!productAttribute.brand || !productAttribute.size || !productAttribute.color) {
        throw new Conflict("Clothing must include brand and size");
      }
      await Clothing.create({
        _id: newProduct._id,
        ...productAttribute,
        createByUser: userId
      });
      break;

    case 'Electronic':
      if (!productAttribute.brand || !productAttribute.model || !productAttribute.color) {
        throw new Conflict("Electronic must include brand and model");
      }
      await Electronic.create({
        _id: newProduct._id,
        ...productAttribute,
        createByUser: userId

      });
      break;
  }
  if (newProduct) {
    await inventoriesController.insertInventory(newProduct);
  }

  return newProduct;

};

const getProductById = async (id: string) => {
  const product = await Product.findById(id);
  if (!Product) throw new NotFound('Product not found');
  return product;
};

const getAllProducts = async (data: any) => {
  const { page, limit, type, quantity, rating, price, name, createByUser, sortField, sortOrder, search } = data;

  const match: any = {};

  if (type) match.type = type;
  if (search) {
    match.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }
  // if (quantity) match.quantity = { $gte: quantity }; // Số lượng >= quantity
  // if (rating) match.rating = { $gte: rating }; // Đánh giá >= rating
  if (price) match.price = { $lte: price }; // Giá <= price
  if (name) match.name = { $regex: name, $options: 'i' };
  if (createByUser) match.createByUser = covertToObjectId(createByUser);

  const sortFieldToUse = sortField || 'createdAt';
  const sortOrderToUse = sortOrder == 'asc' ? 1 : -1;

  const pipeline: any = [
    { $match: match },
    { $sort: { [sortFieldToUse]: sortOrderToUse } },
  ];


  const options = {
    page: page || 1,
    limit: limit || 10,
    customLabels: {
      docs: 'products',
    },
  };

  const product = await Product.aggregatePaginate(pipeline, options);
  return product
};

const updateProduct = async (id: string, updates: Partial<IProduct>) => {
  const product = await Product.findByIdAndUpdate(id, updates, { new: true });
  return product
};

const deleteProduct = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};

// search product

const searchProduct = async (searchText: string) => {
  if (!searchText) throw new BadRequest('Search text is required');
  const regex = new RegExp(searchText, 'i');
  const products = await Product.find({ $or: [{ name: regex }, { description: regex }] });
  return products;
};




export default { createProduct, getProductById, getAllProducts, updateProduct, deleteProduct, searchProduct };