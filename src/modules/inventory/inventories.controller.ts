import { IProduct } from "@modules/product/products.model";
import { Inventory } from "./inventories.model";
import inventoriesService from "./inventories.service";


// thieu productShop
const insertInventory = async (product: any) => {
    const newProduct = await inventoriesService.addInv({
        inv_ProductId: product._id,
        inv_stock: product.quantity,
        inv_shopId: product.createByUser
    });
    return newProduct;
};


export default { insertInventory }