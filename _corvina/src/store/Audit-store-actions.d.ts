declare const _default: {
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
export default _default;
