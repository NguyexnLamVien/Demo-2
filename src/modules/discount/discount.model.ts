import mongoose, { Schema, Document, Types } from 'mongoose';
import slugify from 'slugify';

interface IDiscount extends Partial<WithID> {
    name: string;
    description: string;
    value: number;
    active: boolean;
    code: string;
    startDate: Date;
    endDate: Date;
    maxUse: number;
    usesCount?: number;
    usesUsers?: [string];
    minOrderValue: number;
    createByUser: Types.ObjectId;
    applyTo: string;
    productUse?: [];
    name_slug?: string;
}

const discountSchema: Schema<IDiscount> = new Schema({
    name: { type: String, required: true },
    name_slug: { type: String },
    description: { type: String },
    value: { type: Number, required: true },
    active: { type: Boolean, default: true },
    code: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    maxUse: { type: Number, required: true },
    usesCount: { type: Number, default: 0 },
    usesUsers: { type: [Types.ObjectId], default: [] },
    minOrderValue: { type: Number, required: true },
    createByUser: { type: Schema.Types.ObjectId, ref: 'User' },
    applyTo: { type: String, required: true, enum: ['all', 'specific'] },
    productUse: { type: [Types.ObjectId], default: [] },
}, {
    timestamps: true,
});

const Discount = mongoose.model<IDiscount>('Discount', discountSchema);

export { Discount, IDiscount }