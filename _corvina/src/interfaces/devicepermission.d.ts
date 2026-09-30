import PaginationQueryParamsDTO from './commons/PaginationQueryParamsDTO';
import { ModelRoleInDTO } from './modelrole';
import { SecurityPolicyInDTO } from './securitypolicy';
export interface DevicePermissionInDTO {
    id: number;
    name: string;
}
export interface DetailedDevicePermissionInDTO extends DevicePermissionInDTO {
    modelRole: ModelRoleInDTO;
    deviceGroup: SecurityPolicyInDTO;
}
export interface DevicePermissionUpdateDTO {
    deviceGroup: number;
    modelRole: number;
}
export interface DevicePermissionOutDTO extends DevicePermissionUpdateDTO {
    name: string;
}
export interface DevicePermissionQueryParamsDTO extends PaginationQueryParamsDTO {
    name?: string;
    orderBy?: string;
    orderDir?: string;
}
