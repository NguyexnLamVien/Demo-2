import casbin from '../config/casbin';
// const initializeRoles = async () => {
//     try {

//         const data = await Promise.all([
//             casbin.addPolicy('6722f46899afd3a344826501', RESOURCES.USER, ACTIONS.READ),
//             casbin.addPolicy('6722f6077eda01d808657583', RESOURCES.BLOG, ACTIONS.WRITE),
//             casbin.addPolicy('6722f6077eda01d808657583', RESOURCES.BLOG, ACTIONS.READ),
//             casbin.addPolicy('6722f46899afd3a344826501', RESOURCES.POLICY_CONTROL, ACTIONS.UPDATE),
//         ])
//         console.log(data);

//         await casbin.loadPolicy();
//     } catch (error) {
//         console.error('Failed to initialize roles:', error);
//     }
// };


// //  * Gán vai trò quản trị cho người dùng quản trị

// const addPolicyForUser = async (userId: string, roleId: string) => {
//     await casbin.addRoleForUser(userId, roleId)
// }

// // * Kiểm tra xem người dùng quản trị có vai trò 'ADMIN' hay không.
// const hasPolicy = async () => {
//     const check = await casbin.hasRoleForUser(Cr7, Sub.ADMIN)
//     console.log(check);

// }

// const getRolesForUser = async (userId: string) => {
//     const roles = await casbin.enforcer.getRolesForUser(userId);
//     return roles;
// }

// const hasPermissionForUser = async () => {
//     const check = await casbin.enforcer.hasPermissionForUser(Cr7, RESOURCES.USER, ACTIONS.WRITE);
//     console.log(check);
//     return check
// }

// const enfor1 = async () => {
//     const check = await casbin.enforcer.enforce(Athorni, RESOURCES.USER, ACTIONS.WRITE);
//     console.log(check);
// }

// const hasRoleForUser = async () => {
//     const check = await casbin.enforcer.hasRoleForUser(Athorni, Sub.ADMIN);
//     console.log(check);
// }



// setTimeout(async () => {
//     try {
// await ass.initializeRoles()
// await ass.addPolicyForUser()
// await ass.hasPolicy()
// await ass.getRolesForUser()
// await ass.hasPermissionForUser()
// await ass.enfor1()
// await ass.hasRoleForUser()

// await ass.addPolicyForUser('6720a99bab58d8c416fc0459', '6722f6077eda01d808657583')

// middleware
// const caseUserContent = async () => {
//             const userId = '6720a99bab58d8c416fc0459'

//             const userInfo = User.findById(userId);

//             const roles = await casbin.enforcer.getRolesForUser(userId);
//             const policy = await casbin.enforcer.getImplicitPermissionsForUser(userId)
//             const NewID = (id: string) => {
//                 return new Types.ObjectId(id)
//             }
//             const getRoleCollection = await RoleCollection.find({
//                 _id: { $in: roles.map(NewID) }
//             }).select("_id title")

//             console.log('policy', policy.map(([, ...rest]: any) => rest));
//             return {
//                 ModelRoles: getRoleCollection,
//                 policy: policy.map(([, ...rest]: any) => rest)
//             }
//         }
//         const result = await caseUserContent();
//         const mactch = [
//             [
//                 ['user', 'update'],
//                 ['policy_ctl', 'read'],
//                 ['policy_ctl', 'update'],
//             ],
//             [
//             ]
//         ]

const addPolicy = async () => {
    await casbin.addPolicy('6722f46899afd3a344826501', '*', '*');
}

const OrCheckPolicy = (match: [string, string][], policyMatch: [string, string][]) => {
    return policyMatch.some(([role, action]) => {
        return match.some(([role2, action2]) => role === role2 && action === action2)
    })
}
const AndCheckPolicy = (...match: boolean[]) => {
    return match.every(v => v === true)
}
///module user , get list user
// console.log('check read', OrCheckPolicy([
//     ['user', 'read']
// ]));
//         ///module blog ,  delete Blog
//         console.log('check blog delete',
//             AndCheckPolicy(
//                 OrCheckPolicy([
//                     ['user', 'admin']
//                 ]),
//                 OrCheckPolicy([
//                     ['blog', 'delete']
//                 ])
//             )
//         );
//         ///module blog ,  delete Blog
//         console.log('check blog update',
//             OrCheckPolicy([
//                 ['user', 'admin']
//             ]),
//             OrCheckPolicy([
//                 ['blog', 'update']
//             ])
//         );
//         ///module user , update profile user
//         console.log('check update', OrCheckPolicy([
//             ['user', 'update']
//         ]));
//         ///module user , delete profile user
//         console.log('check delete', OrCheckPolicy([
//             ['user', 'delete']
//         ]));
//     } catch (error) {
//     }
// }, 1000)

// export default { addPolicyForUser, hasPolicy, getRolesForUser, hasPermissionForUser, enfor1, hasRoleForUser, initializeRoles };

export { OrCheckPolicy, AndCheckPolicy, addPolicy }