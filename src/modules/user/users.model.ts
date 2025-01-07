import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Partial<WithID> {
  name?: string;
  email?: string;
  password?: string;
  refreshToken?: string;
  otp?: string;
  otpExpiry?: Date;
  isVerified?: boolean,
  verifiedAt?: Date
}


const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true, index: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String, default: null },
  otp: {
    type: String,
  },
  otpExpiry: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifiedAt: Date,
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});
const User = mongoose.model<IUser>('User', userSchema);

export { User, IUser } 