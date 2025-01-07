import { Types } from "mongoose";


export const covertToObjectId = (id: string) => {
    if (!id) return null;
    return new Types.ObjectId(id);
}

