import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Partial<WithID> {
  name: string;
  email: string;
  password: string;
  courses: mongoose.Types.ObjectId[];
}


const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true, index: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  courses: [{ type: Schema.Types.ObjectId, ref: 'courses' }],
}, {
  timestamps: true,
});
const User = mongoose.model<IUser>('User', userSchema);

export { User, IUser } 