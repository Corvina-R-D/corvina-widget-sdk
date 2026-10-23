import { UserOwnerEnum } from '@/constant/UserOwnerEnum';
import PaginationQueryParamsDTO from './commons/PaginationQueryParamsDTO';
import { RoleInDTO } from './role';
import { UserGroupInDTO, UserGroupMembershipRole } from './userGroup';
export interface UserInDTO {
    id: number;
    email: string;
    username: string;
    serviceAccount?: boolean;
    serviceAccountSecret?: string;
    groupPoliciesEnabled?: boolean;
    membershipRole?: UserGroupMembershipRole;
    mfaEnabled?: boolean;
    socialLoginOnly?: boolean;
}
export interface DeepSearchUserDTO {
    id: number;
    email: string;
    username: string;
    serviceAccount?: boolean;
    organizations: {
        resourceId: string;
    }[];
}
export interface UserOutDTO {
    email: string;
    username: string;
    password?: string;
    serviceAccount?: boolean;
    serviceAccountClientWebOrigins?: string;
    emailVerified?: boolean;
    temporaryPassword?: boolean;
    groupPoliciesEnabled?: boolean;
    membershipRole?: UserGroupMembershipRole;
    memberOf?: number[];
    regularUserOf?: number[];
    adminUserOf?: number[];
    socialLoginOnly?: boolean;
}
export interface UserUpdateDTO {
    email: string;
    password?: string;
    passwordChangeInvitation?: boolean;
    groupPoliciesEnabled?: boolean;
    socialLoginOnly?: boolean | null;
}
export declare enum UserTypes {
    ANY = "ANY",
    STANDARD = "STANDARD",
    SERVICE = "SERVICE"
}
export interface UserQueryParamsDTO extends PaginationQueryParamsDTO {
    groupId?: number;
    orderBy?: string;
    orderDir?: string;
    username?: string;
    type?: UserTypes;
    search?: string;
    include?: string;
}
export interface UserDeepSearchQueryParamsDTO extends PaginationQueryParamsDTO {
    orderBy?: string;
    orderDir?: string;
    username?: string;
    type?: UserTypes;
    orgResourceId?: string;
}
export interface UserFormData {
    userData: UserOutDTO;
    memberOf: number[];
    regularUserOf: number[];
    adminUserOf: number[];
    userRoles: number[];
    associatedDevices: number[];
    groups: Array<UserGroupInDTO>;
}
export interface UserDataTable extends UserInDTO {
    organization: string;
    roles: RoleInDTO;
    owner: UserOwnerEnum;
    ownerRef: string;
    userImpersonation: boolean;
}
export interface SecretOutDto {
    clientSecret: string;
    tokenEndpoint: string;
}
export interface UserPreferenceInDTO {
    id: number;
    orgResourceId: string;
    username: string;
    serviceName: string;
    value1?: string;
    value2?: string;
    value3?: string;
    value4?: string;
    value5?: string;
    valueJson?: string;
}
export interface ApiKeyDTO {
    id: number;
    orgResourceId: string;
    userId: number;
    key: string;
}
export interface ApiKeySummaryDTO {
    id: number;
    orgResourceId: string;
    userId: number;
    hint: string;
}
