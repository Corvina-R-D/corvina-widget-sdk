import { UserGroupInDTO, UserGroupMembershipRole } from "@/interfaces/userGroup";
import { UserUpdateDTO } from "@/interfaces/user";
export interface UserGroupMembershipDifference {
    id: number;
    membershipRole: UserGroupMembershipRole;
}
export default class PermissionDataFormatter {
    static getOrganizationName(): any;
    static formatModelRoleData(modelRoleData: any): {
        label: any;
        description: any;
        name: any;
        modelPathPermissions: any[];
        deviceGroups: any[];
        type: any;
        deviceGeneralPermission: any;
        vpnGeneralPermission: any;
    };
    static formatModelPathsData(modelPaths: any): {
        read: any;
        write: any;
        history: any;
        name: any;
        modelPath: any;
    }[];
    static formatUserEditedData(userData: {
        userData: UserUpdateDTO;
        memberOf: number[];
        regularUserOf: number[];
        adminUserOf: number[];
        userRoles: number[];
        userGroups: UserGroupInDTO[];
        userSpecialGroupRoles: UserGroupInDTO[];
        associatedDevices: number[];
        userAssociatedDevices: number[];
    }): {
        groupsToAdd: UserGroupMembershipDifference[];
        groupsToRemove: number[];
        rolesToAdd: number[];
        rolesToRemove: number[];
        passwordChangeInvitation: boolean;
        associatedDevicesToAdd: number[];
        associatedDevicesToRemove: number[];
    };
    static formatRolesAssociatedToDevicePermissions(roles: any): string;
    static getDefaultGroupPermissions(deviceGroups: any): any;
    static getFormattedDefaultGroupPermissions(deviceGroups: any): any;
    static formatTableRow(elements: any, field: any): string;
    static formatSpanTableRow(elements: any, field: any): string;
    static formatModelPermissionsData(permissions: any): {
        modelPermissions: any[];
        modelRole: import("lodash").PartialDeep<{}>;
    };
    static sortPermissions(permissionGroups: any): void;
    static groupsApplicationPermissions(permissions: any, iot: any, vpn: any, dealer: any): {};
    static formatUserData({ username, email, groups, roles, password, isServiceAccount, serviceAccountClientWebOrigins, passwordChangeInvitation, groupPoliciesEnabled, associatedDevices, }: {
        username: string;
        email: string;
        groups: Array<UserGroupInDTO>;
        roles: Array<any>;
        password: string;
        isServiceAccount: boolean;
        serviceAccountClientWebOrigins: string[];
        passwordChangeInvitation: boolean;
        groupPoliciesEnabled: boolean;
        associatedDevices: Array<any>;
    }): {
        userData: {
            email: string;
            username: string;
            emailVerified: boolean;
            temporaryPassword: boolean;
            serviceAccount: boolean;
            serviceAccountClientWebOrigins: string[];
            passwordChangeInvitation: boolean;
            groupPoliciesEnabled: boolean;
        };
        memberOf: number[];
        regularUserOf: number[];
        adminUserOf: number[];
        userRoles: any[];
        associatedDevices: any[];
    };
    static formatGroupData(isUpdating: any, name: any, roles: any, appStoreRoles: any, dataRoles: any, users: any): {
        name: any;
        rolesId: any[];
        membersId: any[];
        regularUserMembersId: any[];
        adminUserMembersId: any[];
    };
}
