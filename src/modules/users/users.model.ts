import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Partial<WithID> {
  name: string;
  email: string;
  password: string;
  refreshToken?: string;
}


const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true, index: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String, default: null },
}, {
  timestamps: true,
});
const User = mongoose.model<IUser>('User', userSchema);

export { User, IUser } 