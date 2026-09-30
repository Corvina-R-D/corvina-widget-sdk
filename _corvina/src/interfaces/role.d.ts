import PaginationQueryParamsDTO from './commons/PaginationQueryParamsDTO';
import { ApplicationPermissionInDTO } from './applicationpermission';
import { RoleOwnerEnum } from '../constant/RoleOwnerEnum';
export interface RoleInDTO {
    createdAt: string;
    deleted: boolean;
    description: string;
    enabled: boolean;
    id: number;
    name: string;
    label: string;
    updatedAt: string;
    owner: RoleOwnerEnum;
    owners: RoleOwnerEnum[];
    ownerRef?: string;
    enableAccessToApp: boolean;
    defaultStar: boolean;
}
export declare const isRoleToAccessApp: (role: RoleInDTO) => boolean;
export declare const formatRoleLabel: (role: RoleInDTO) => RoleInDTO;
export interface DetailedRoleInDTO extends RoleInDTO {
    applicationPermissions?: ApplicationPermissionInDTO[];
    devicePermissions?: DevicePermission[];
}
export interface RoleOutDTO extends RoleUpdateDTO {
    enabled: boolean;
    name: string;
    label: string;
}
export interface RoleUpdateDTO {
    applicationPermissions?: number[];
    description?: string;
    devicePermission?: number[];
    defaultStar?: boolean;
}
export interface RoleQueryParamsDTO extends PaginationQueryParamsDTO {
    orderDir?: string;
    orderBy?: string;
    name?: string;
    userGroupId?: string;
    owners?: RoleOwnerEnum[];
    ownerRef?: string;
    search?: string;
}
interface DevicePermission {
    id: number;
    deleted: boolean;
}
export interface RoleDataTable extends RoleInDTO {
    organization?: string;
    groups?: any;
}
export {};
