import mongoose, { Schema, Types } from "mongoose";

interface ICart extends Partial<WithID> {
    cartState: 'active' | 'completed' | 'failed' | 'pending',
    cartProduct: ICartProduct[],
    cartUserId: Types.ObjectId,
    countProduct: number
}
interface ICartProduct extends Partial<WithID> {
    productId: Types.ObjectId;
    quantity: number;
}
const cartProductSchema = new Schema<ICartProduct>({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
});

const cartSchema: Schema<ICart> = new Schema({
    cartState: {
        type: String,
        enum: ['active', 'completed', 'failed', 'pending'],
        default: 'active'
    },
    cartProduct: [cartProductSchema],
    cartUserId: { type: Schema.Types.ObjectId, ref: 'User' },
    countProduct: { type: Number, default: 0 },

}, {
    timestamps: true,
});

const Cart = mongoose.model<ICart>("Cart", cartSchema);

export { Cart, ICart }

