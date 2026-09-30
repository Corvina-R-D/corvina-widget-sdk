import AbstractAxiosInstance from "./AbstractAxiosInstance";
import { NotificationIn, NotificationInDTO } from "@/interfaces/notification";
declare class NotificationAxiosInstance extends AbstractAxiosInstance {
    constructor();
    updateBaseUrl(): void;
    createNotification(notification: NotificationIn): Promise<any>;
    getNotifications(params?: any): Promise<NotificationInDTO>;
    getNotification(id: number, params?: any): Promise<NotificationIn>;
    deleteNotification(id: number, params?: any): Promise<any>;
    updateNotification(id: number, notification: NotificationIn): Promise<any>;
}
declare const _default: NotificationAxiosInstance;
export default _default;
