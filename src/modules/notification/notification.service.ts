import { Notification } from "./notification.model";


const pushNotiToSysten = async (
    type = 'SHOP-001',
    receivedId = 1,
    senderId = 1,
    option = {}
) => {
    let noti_content;

    if (type === 'SHOP-001') {
        noti_content = '@@@ vừa mới thêm một sản phẩm: @@@@'
    } else if (type === 'PROMOTION-001') {
        noti_content = '@@@ vừa mới thêm một voicher mới: @@@@'
    }

    const newNoti = await Notification.create
}