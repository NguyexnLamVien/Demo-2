import { OK } from '@core/types/success.response';
import userService from '@modules/user/users.service';
import { NextFunction, Request, Response } from 'express';




const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    
    res.json(users);

    // res.render('views/home');
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const { name, password } = req.body;
    const user = await userService.updateUser(userId, name, password);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const user = await userService.deleteUser(userId);
    res.json({ message: 'User deleted successfully', user });
  } catch (error) {
    next(error);
  }
};

export default { getAll, updateUser, deleteUser };

