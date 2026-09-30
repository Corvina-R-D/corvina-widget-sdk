import AbstractAxiosInstance from './AbstractAxiosInstance';
import { AuditInDTO, FailedNotificationDTO } from '@/interfaces/audit';
declare class AuditAxiosInstance extends AbstractAxiosInstance {
    constructor();
    updateBaseUrl(): void;
    getEventList(params?: any): Promise<AuditInDTO>;
    getFailedNotificationList(params?: any): Promise<FailedNotificationDTO>;
}
declare const _default: AuditAxiosInstance;
export default _default;
