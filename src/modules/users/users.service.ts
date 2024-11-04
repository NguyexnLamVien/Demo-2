
import { hashPassword, comparePassword } from '@modules/utils/bcrypt';
import { User } from '@modules/users/users.model';
import { Conflict, NotFound, Unauthorized } from '@core/types/errorHandler';


const getAllUsers = async () => {
  return User.find().select('-password');
};

const updateUser = async (userId: string, name: string, password: string) => {
  const user = await User.findById(userId);
  if (!user) throw new NotFound('User not found');
  if (password) {
    user.password = await hashPassword(password);
  }
  if (name) {
    user.name = name;
  }
  await user.save();
  return user;
};

const deleteUser = async (userId: string) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) throw new NotFound('User not found');
  return user;
};


export default { getAllUsers, updateUser, deleteUser };
