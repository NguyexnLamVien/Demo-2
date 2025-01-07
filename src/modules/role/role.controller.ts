import { NextFunction, Request, Response } from 'express';
import roleService from './role.service';
import { Forbidden } from '@core/types/error.response';

const createRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        const newRole = await roleService.createRole(body);
        res.json({ message: 'Role created successfully', newRole });
    } catch (error) {
        next(error);
    }
};

const addRoleForUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { roleId, userId } = req.body;
        if (!roleId || !userId) throw new Forbidden('Missing roleId or userId');
        const role = await roleService.addRoleForUser(roleId, userId);
        res.json({ message: 'Role added successfully', role });
    } catch (error) {
        next(error);
    }
};


export default { createRole, addRoleForUser };

