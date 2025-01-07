import mongoose, { Schema, Types } from "mongoose";

interface IOrder extends Partial<WithID> {
}

const orderSchema: Schema<IOrder> = new Schema({

}, {
    timestamps: true,
});

const Order = mongoose.model<IOrder>("Order", orderSchema);

export { Order, IOrder }

