import AbstractAxiosInstance from "./AbstractAxiosInstance";
import { AdminNotificationIn, AdminNotificationInDTO, AdminNotificationOut } from "@/interfaces/adminnotification";
declare class AdminNotificationsAxiosInstance extends AbstractAxiosInstance {
    constructor();
    updateBaseUrl(): void;
    deleteAdminNotification(notificationId: any): Promise<void>;
    updateAdminNotification(notificationId: number, notification: AdminNotificationOut): Promise<AdminNotificationIn>;
    createAdminNotification(notification: AdminNotificationOut): Promise<AdminNotificationIn>;
    getAdminNotification(params: {
        page: number;
        pageSize: number;
    }): Promise<AdminNotificationInDTO>;
}
declare const _default: AdminNotificationsAxiosInstance;
export default _default;
