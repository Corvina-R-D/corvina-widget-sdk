declare const _default: {
    namespaced: boolean;
    state: {
        notifications: {};
    };
    mutations: {
        SAVE_NOTIFICATIONS(state: any, notifications: any): void;
        UNSHIFT_NOTIFICATION(state: any, notification: any): void;
        PUSH_NOTIFICATION(state: any, notification: any): void;
        POP_NOTIFICATION(state: any, notification: any): void;
        UPDATE_NOTIFICATION(state: any, notification: any): void;
    };
    actions: {
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
    getters: {
        getNotifications(state: any): any;
    };
};
export default _default;
