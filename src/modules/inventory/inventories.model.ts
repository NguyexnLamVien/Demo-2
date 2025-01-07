import mongoose, { Schema, Document, Types } from 'mongoose';
import slugify from 'slugify';

interface IInventory extends Partial<WithID> {
    inv_ProductId: Types.ObjectId,
    inv_stock: number,
    inv_shopId: Types.ObjectId
}

const inventorySchema: Schema<IInventory> = new Schema({
    inv_ProductId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
    inv_stock: { type: Number, required: true },
    inv_shopId: { type: Schema.Types.ObjectId, required: true, ref: 'Shop' },
}, {
    timestamps: true,
});


const Inventory = mongoose.model<IInventory>('Inventory', inventorySchema);

export { Inventory, IInventory }

