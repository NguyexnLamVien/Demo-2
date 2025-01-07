import mongoose, { Schema } from "mongoose";


interface INotification extends Partial<WithID> {
    noti_type: ['ORDER-001', ' ORDER-002', 'PROMOTION-001', 'SHOP-001'],
    noti_senderId: number,
    noti_receiverId: number,
    noti_content: string,
    noti_options: object
}

const noficationSchema = new mongoose.Schema({
    noti_type: { type: String, required: true, enum: ['ORDER-001', ' ORDER-002', 'PROMOTION-001', 'SHOP-001'] },
    noti_senderId: { type: Number, required: true },
    noti_receiverId: { type: Number, required: true },
    noti_content: { type: String, required: true },
    noti_options: { type: Object, default: {} }

}, {
    timestamps: true
});

const Notification = mongoose.model<INotification>('Notification', noficationSchema, 'Notification');

export { Notification, INotification }