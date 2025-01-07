import mongoose, { Schema, Document, Types } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
// import mongoosePaginate  from 'mongoose-paginate-v2';
import slugify from 'slugify';

interface IProduct extends Partial<WithID> {
  createByUser: Types.ObjectId;
  name: string;
  slug: string;
  price: number;
  description: string;
  thumbnail?: string;
  quantity: number;
  rating?: number;
  productAttribute: any;
  type: string;
}

const productSchema: Schema<IProduct> = new Schema({
  createByUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  slug: { type: String },
  thumbnail: { type: String },
  price: { type: Number, required: true, min: 1 },
  description: { type: String },
  quantity: { type: Number, required: true, min: 1 },
  rating: {
    type: Number,
    set: (value: number) => Math.round(value * 10) / 10,
  },
  productAttribute: { type: Schema.Types.Mixed, required: true },
  type: { type: String, required: true, enum: ['Clothing', 'Electronic'] },
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

productSchema.pre('save', async function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
});

productSchema.virtual('assignUser', {
  ref: 'User',
  localField: '_id',
  foreignField: 'Products',
  justOne: false
})

const ClothingSchema = new Schema({
  brand: { type: String, required: true },
  size: { type: String },
  color: { type: String },
  createByUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const ElectronicSchema = new Schema({
  brand: { type: String, required: true },
  model: { type: String },
  color: { type: String },
  createByUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

productSchema.plugin(mongooseAggregatePaginate);
// productSchema.plugin(mongoosePaginate) cui

const Product = mongoose.model<IProduct, mongoose.AggregatePaginateModel<IProduct>>('Product', productSchema);
const Clothing = mongoose.model('Clothing', ClothingSchema);
const Electronic = mongoose.model('Electronic', ElectronicSchema);

export { Product, IProduct, Clothing, Electronic };
