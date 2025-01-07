import { BadRequest } from "@core/types/error.response";
import { Cart } from "./cart.model";
import { Product } from "@modules/product/products.model";

const updateCartItemQuantity = async (cartUserId: string, productId: string, quantity: number) => {
    return Cart.findOneAndUpdate(
        {
            cartUserId,
            'cartProduct.productId': productId
        },
        {
            $inc: {
                'cartProduct.$.quantity': quantity,
            }
        },
        { new: true }
    );
}
const addToCart = async (data: any) => {

    const { cartUserId, productId, quantity } = data;

    const product = await Product.findById(productId).lean();

    // if (product?.createByUser == cartUserId) throw new BadRequest('You cannot add your own product to cart');
    if (!product) throw new BadRequest('Product not found');
    if (product.quantity < quantity) throw new BadRequest('Insufficient stock');

    const existingCart = await Cart.findOne({
        cartUserId: cartUserId,
        'cartProduct.productId': productId
    });

    if (existingCart) {
        return await updateCartItemQuantity(cartUserId, productId, quantity);
    } else {
        return await Cart.findOneAndUpdate(
            {
                cartUserId: cartUserId,
            },
            {
                $push: { cartProduct: { productId, quantity } },
                $inc: { countProduct: quantity }
            },
            { new: true, upsert: true }
        );
    }

};

// delete cart item

const deleteCartItem = async (cartUserId: string, productId: string) => {
    const CountProduct = await Cart.findOne({
        cartUserId,
        'cartProduct.productId': productId
    }).select('countProduct').lean();

    const data = await Cart.findOneAndUpdate(
        {
            cartUserId,
            'cartProduct.productId': productId
        },
        {
            $pull: { cartProduct: { productId } },
            $inc: { countProduct: -CountProduct!.countProduct }
        },
        { new: true }
    );

    return data;
}

const getCart = async (cartUserId: string) => {
    return await Cart.findOne({ cartUserId }).populate('cartProduct');
}

export default { addToCart, deleteCartItem, getCart, updateCartItemQuantity };
