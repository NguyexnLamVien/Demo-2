import casbin from '@config/casbin/index';
import { Forbidden, NotFound } from '@core/types/errorHandler';
import { OrCheckPolicy } from '@feature/casbin';
import RoleCollection from '@modules/role/role.collection';
import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
const authorizationMiddleware = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.header.id;
    const { method, path } = req;
    const formatPath = path.slice(1, -1);
    const formatMethod = method.toLowerCase();

    try {
        const roles = await casbin.enforcer.getRolesForUser(userId);

        if (roles.length == 0) throw new NotFound('User not found');

        const data = await casbin.enforcer.getImplicitPermissionsForUser(userId);
        if (data.length == 0) throw new Forbidden('You do not have permission to perform this action.');

        // const NewID = (id: string) => {
        //     return new Types.ObjectId(id);
        // };

        // const getRoleCollection = await RoleCollection.find({
        //     _id: { $in: roles.map(NewID) }
        // }).select("_id title");

        // const policyMatch = data.map(([, ...rest]: any) => rest);

        // const match: [string, string][] = [[formatPath, formatMethod]];

        const check = await casbin.checkPermission(roles, formatPath, formatMethod);
        if (!check) throw new Forbidden('You do not have permission to perform this action.');



        // const hasPermission = OrCheckPolicy(match, policyMatch);

        // if (!hasPermission) {
        //     throw new Forbidden('You do not have permission to perform this action.');
        // }

        next();
    } catch (error) {
        next(error);
    }
};




export { authorizationMiddleware };
