import RoleCollection from "./role.collection";
import { RoleBase } from "@modules/role/role.collection";
import Casbin from './../../config/casbin/index';

const createRole = async (body: RoleBase) => {
    return await RoleCollection.create(body);
}
function findId(id: string) {
    return RoleCollection.findById(id);

}
const addRoleForUser = async (userId: string, roleId: string) => {
    return await Casbin.addRoleForUser(userId, roleId);
}

const removeRoleForUser = async (userId: string, roleId: string) => {
    return await Casbin.removeRoleForUser(userId, roleId);
}



export default {
    createRole,
    findId,
    addRoleForUser,
    removeRoleForUser,

}