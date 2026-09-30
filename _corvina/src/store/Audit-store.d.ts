declare const _default: {
    namespaced: boolean;
    state: {
        audits: any[];
        pagination: {
            totalPages: number;
            totalElements: number;
        };
        failedNotifications: any[];
        failedNotificationsPagination: {
            totalPages: number;
            totalElements: number;
        };
    };
    mutations: {
        SAVE_AUDITS(state: any, audits: any): void;
        SAVE_AUDIT_PAGINATION(state: any, pagination: any): void;
        SAVE_FAILED_NOTIFICATIONS(state: any, failedNotifications: any): void;
        SAVE_FAILED_NOTIFICATIONS_PAGINATION(state: any, failedNotificationsPagination: any): void;
    };
    actions: {
        saveAudits(context: any, audits: any): void;
        fetchAuditEventList(context: any, filter?: {
            search: string;
            page: number;
            pageSize: number;
            append: boolean;
            sortBy: string;
            sortDir: string;
            filterSeverity: string;
            filterDate: {
                start: string;
                end: string;
            };
            queryParams: any[];
            filterBy: any[];
            useTags: boolean;
        }): Promise<import("../interfaces/audit").AuditInDTO>;
        saveFailedNotifications(context: any, failedNotifications: any): void;
        fetchFailedNotificationsList(context: any, filter?: {
            search: string;
            page: number;
            pageSize: number;
            append: boolean;
            sortBy: string;
            sortDir: string;
            filterSeverity: string;
            filterDate: {
                start: string;
                end: string;
            };
            queryParams: any[];
            filterBy: any[];
            useTags: boolean;
        }): Promise<import("../interfaces/audit").FailedNotificationDTO>;
    };
    getters: {
        getAudits(state: any): any;
        getAuditsPagination(state: any): any;
        getFailedNotifications(state: any): any;
        getFailedNotificationsPagination(state: any): any;
    };
};
export default _default;
