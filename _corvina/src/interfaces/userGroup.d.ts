import PaginationQueryParamsDTO from './commons/PaginationQueryParamsDTO';
import { UserInDTO } from './user';
import { DEVICE_ROLE_PERMISSION } from '../constant/Roles';
import { UserOwnerEnum } from '../constant/UserOwnerEnum';
export declare enum UserGroupType {
    STANDARD = "STANDARD",
    SELF_USER_ANY = "SELF_USER_ANY",
    SELF_USER = "SELF_USER",
    ALL_USER = "ALL_USER",
    SELF_USER_SERVICE = "SELF_USER_SERVICE",
    ALL = "ALL"
}
export declare function getIconUserGroupType(item: UserGroupInDTO): string;
export declare enum UserGroupMembershipRole {
    ADMIN = "ADMIN",
    USER = "USER"
}
export interface UserGroupInDTO {
    id: number;
    name: string;
    label?: string;
    organizationId: number;
    type: UserGroupType;
    owner?: UserOwnerEnum;
    groupPoliciesEnabled?: boolean;
    membershipRole?: UserGroupMembershipRole;
}
export interface UserGroupOutDTO extends UserGroupUpdateDTO {
    name: string;
}
export interface UserGroupUpdateDTO {
    membersId: number[];
    regularUserMembersId: number[];
    adminUserMembersId: number[];
    rolesId: number[];
}
export interface UserGroupQueryParamsDTO extends PaginationQueryParamsDTO {
    name?: string;
    orderBy?: string;
    orderDir?: string;
    roleId?: number;
    type?: UserGroupType;
    userId?: number;
    username?: string;
    adminOnly?: boolean;
    search?: string;
}
export interface UserGroupDataTable extends UserGroupInDTO {
    organization?: string;
    users?: UserInDTO[];
}
export interface UserAuthorizationDTO {
    deviceGeneralPermission: DEVICE_ROLE_PERMISSION;
    vpnGeneralPermission: DEVICE_ROLE_PERMISSION;
}
export type DevicePermissionsCacheEntry = {
    timestamp: number;
    permissions: UserAuthorizationDTO;
};
export interface DevicePermissionsCache {
    [deviceId: string]: DevicePermissionsCacheEntry;
}
