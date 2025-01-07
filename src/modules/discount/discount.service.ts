import { BadRequest } from "@core/types/error.response";
import { Discount, IDiscount } from "./discount.model";
import { FilterQuery } from "mongoose";
import { covertToObjectId } from './../util/mongooses';



const createDiscount = async (data: IDiscount) => {
    const { name, description, value, active, code, startDate, endDate, maxUse, usesCount, usesUsers, minOrderValue, createByUser, applyTo, productUse } = data;
    const _startDate = new Date(startDate); //mm-dd-yyyy-hh-mm-ss
    const _endDate = new Date(endDate);

    if (isNaN(_startDate.getTime()) || isNaN(_endDate.getTime())) throw new BadRequest('Invalid start date');
    if (_startDate > _endDate) throw new BadRequest('Start date must be before end date');
    if (_startDate <= new Date()) throw new BadRequest('Start date cannot be in the past');


    const existingDiscount = await Discount.findOne({ code: code, createByUser: createByUser }).lean();
    if (existingDiscount) throw new BadRequest('Discount code already exists');

    const discount = await Discount.create(data);
    return discount;
};

const deleteDiscount = async (discountId: string) => {
    if (!discountId) throw new BadRequest('ID giảm giá là bắt buộc');
    const discount = await Discount.findByIdAndDelete(discountId);
    if (!discount) throw new BadRequest('Không tìm thấy mã giảm giá');
    return discount;
};

const getAllDiscountCodesWithProducts = async () => {
    const discounts = await Discount.find({ applyTo: 'specific' }).populate('productUse').lean();
    return discounts;
};

const getAllDiscount = async ({
    userId,
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    isActive,
    search
}: any) => {
    let query: FilterQuery<IDiscount> = {
        createByUser: userId,
    };

    if (isActive !== undefined) {
        query.active = isActive;
    }

    if (search) {
        query = {
            ...query,
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { code: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ]
        };
    }

    const currentDate = new Date();
    query = {
        ...query,
        startDate: { $lte: currentDate },
        endDate: { $gte: currentDate }
    };
    const skip = (page - 1) * limit;

    const total = await Discount.countDocuments(query);

    const discounts = await Discount.find(query)
        .sort({ [sortBy]: -1 })
        .skip(skip)
        .limit(limit)
        .populate('createByUser', 'name email').lean();

    return {
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            limit: limit
        },
        data: discounts
    };
};

const getAllDiscountCodesByShop = async (limit: number, page: number, createByUser: string) => {
    const createByUser_ = covertToObjectId(createByUser);
    const skip = (page - 1) * limit;
    const discounts = await Discount.find({ createByUser: createByUser_ })
        .limit(limit)
        .skip(skip)
        .lean();

    return discounts;
};

const getDiscountAmount = async (userId: string, discountCode: string, totalOrder: number) => {
    const discount = await Discount.findOne({
        code: discountCode,
        active: true,
        startDate: { $lte: new Date() },
        endDate: { $gte: new Date() }
    }).lean();

    if (!discount) throw new BadRequest('Mã giảm giá không hợp lệ hoặc đã hết hạn');

    if (discount.maxUse <= discount.usesCount!) throw new BadRequest('Mã giảm giá đã hết lượt sử dụng');

    if (totalOrder < discount.minOrderValue) throw new BadRequest(`Đơn hàng phải có giá trị tối thiểu ${discount.minOrderValue}`);

    if (discount.usesUsers!.includes(userId)) throw new BadRequest('Bạn đã sử dụng mã giảm giá này');

    const discountAmount = discount.value;
    await Discount.findByIdAndUpdate(discount._id, {
        $inc: { usesCount: 1 },
        $push: { usesUsers: userId }
    });

    return discountAmount;
};

const getAllDiscountCodes = async (limit: number, page: number) => {
    const skip = (page - 1) * limit;
    const discounts = await Discount.find({ active: true })
        .limit(limit)
        .skip(skip)
        .lean();

    return discounts;
};



export default { createDiscount, deleteDiscount, getAllDiscountCodesWithProducts, getAllDiscountCodesByShop, getAllDiscount, getDiscountAmount, getAllDiscountCodes };