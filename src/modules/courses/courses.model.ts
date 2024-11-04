import mongoose, { Schema, Document, Types } from 'mongoose';
interface ICourse extends Partial<WithID> {
  createByUser: Types.ObjectId;
  // assignUser?: Types.ObjectId[];
  name: string;
  price: number;
  description: string;
}

const courseSchema: Schema<ICourse> = new Schema({
  createByUser: { type: Schema.Types.ObjectId, ref: 'User' },
  // assignUser: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 1 },
  description: { type: String },
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

courseSchema.virtual('assignUser', {
  ref: 'User',
  localField: '_id',
  foreignField: 'courses',
  justOne: false
})

const Course = mongoose.model<ICourse>('Course', courseSchema);

export { Course, ICourse };
