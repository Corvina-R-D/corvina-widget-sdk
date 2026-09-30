declare const _default: {
    saveNotifications(context: any, presets: any): void;
    unshiftNotification(context: any, notification: any): void;
    pushNotification(context: any, notification: any): void;
    popNotification(context: any, notification: any): void;
    updateNotification(context: any, notification: any): void;
    fetchAllNotifications(context: any, params: any): Promise<import("../interfaces/notification").NotificationInDTO>;
    fetchAllNotificationsWithoutSave(context: any, params: any): Promise<import("../interfaces/notification").NotificationInDTO>;
    createNotification(context: any, notification: any): Promise<any>;
    editNotification(context: any, notification: any): Promise<any>;
    deleteNotification(context: any, notificationId: any): Promise<any>;
};
export default _default;
