import casbin from '@config/casbin/index';
import { Forbidden, NotFound } from '@core/types/error.response';
import { OrCheckPolicy } from '@feature/casbin';
import RoleCollection from '@modules/role/role.collection';
import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';


type ACTIONS = 'get' | 'post' | 'update' | 'delete';

const closureFuntion = (...roles: [string, ACTIONS][]): ContracterRouter<{}> => async (req, res, next): Promise<void> => {
    try {

        // Key resource thay đổi
        // const overBlackList = {
        //     user: "users",
        //     RB: "EFF",
        // } as Record<string, string>
        // const cloneRoles = roles_.map((role) => (roles.map(([r, ...R]) => [role, (overBlackList?.[r] ?? r), ...R]))).flat();

        const userId = req.userId;
        const roles_ = await casbin.enforcer.getRolesForUser(userId);

        const cloneRoles = roles_.map((role) => (roles.map(([...R]) => [role, ...R]))).flat();

        const checks = await Promise.all(cloneRoles.map((r) => casbin.enforcer.enforce(...r)))
        if (!checks.includes(true)) throw new Forbidden('You do not have permission to perform this action.');

        next()


    } catch (error) {
        next(error);
    }
}




export { closureFuntion };

// const authorizationMiddleware = async (req: any, res: Response, next: NextFunction): Promise<void> => {
//     const userId = req.userId;
//     try {
//         const roles = await casbin.enforcer.getRolesForUser(userId);
//         if (roles.length == 0) throw new NotFound('User not found');
//         const data = await casbin.enforcer.getImplicitPermissionsForUser(userId);
//         // await casbin.enforcer.hasPermissionForUser(roles)
//         if (data.length == 0) throw new Forbidden('You do not have permission to perform this action.');
//         // const NewID = (id: string) => {
//         //     return new Types.ObjectId(id);
//         // };
//         // const getRoleCollection = await RoleCollection.find({
//         //     _id: { $in: roles.map(NewID) }
//         // }).select("_id title");
//         // const policyMatch = data.map(([, ...rest]: any) => rest);
//         // const match: [string, string][] = [[formatPath, formatMethod]];
//         const check = await casbin.checkPermission(roles, formatPath, formatMethod);
//         if (!check) throw new Forbidden('You do not have permission to perform this action.');
//         // const hasPermission = OrCheckPolicy(match, policyMatch);
//         // if (!hasPermission) {
//         //     throw new Forbidden('You do not have permission to perform this action.');
//         // }
//         next();
//     } catch (error) {
//         next(error);
//     }
// };