import { PaginationDTO } from "./commons/pagination";
export interface AuditInDTO extends PaginationDTO {
    data: AuditIn[];
}
export interface AuditIn {
    actorUsername: string;
    impersonatedUsername: string;
    entityId: string | number;
    entityIdString: string;
    entityType: string;
    event: string;
    input: any;
    orgResourceId: string;
    timestamp: number;
}
export interface FailedNotificationDTO extends PaginationDTO {
    data: FailedNotification[];
}
export interface FailedNotification {
    type: string;
    destination: string;
    input: any;
    error: string;
    orgResourceId: string;
    timestamp: number;
}
