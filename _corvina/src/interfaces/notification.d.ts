import { PaginationDTO } from "./commons/pagination";
export interface NotificationInDTO extends PaginationDTO {
    data: NotificationIn[];
}
export interface NotificationIn {
    id: String;
    realmId: String;
    name: String;
    description: String;
    minimumSeverity: Number;
    ackTime: Number;
    enabled: Boolean;
    orgResourceId: String;
    updatedAt: Number;
    nameFilters: [String];
    extraFilters: [String];
    deviceGroupFilters: [String];
    recipientFilters: [String];
    days: [String];
}
