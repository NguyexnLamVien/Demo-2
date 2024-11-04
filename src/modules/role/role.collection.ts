import { model, Schema, ObjectId, Types } from "mongoose";


export interface RoleBase {
    _id?: Types.ObjectId,
    title: string,
    status: 'ACTIVE' | 'INACTIVE',
    deletedAt?: Date
}

const RoleSchema = new Schema({
    title: String,
    status: {
        type: String,
        default: "ACTIVE",
        enum: ["ACTIVE", "INACTIVE"]
    },
    deletedAt: Date
})

const RoleCollection = model('Role', RoleSchema, 'Role');

export default RoleCollection;