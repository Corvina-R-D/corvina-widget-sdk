import RolesEnum from '@/constant/Roles';
import { OrganizationGrantDTO, OrganizationInDTO } from '../interfaces/organization';
import { AgreementOutDTO, CheckAgreementOutDTO } from '../interfaces/agreements';
import { SecretOutDto, UserTypes } from '@/interfaces/user';
import { RealmOutDTO } from '@/interfaces/realm';
import { RoleInDTO, RoleQueryParamsDTO, RoleUpdateDTO } from '../interfaces/role';
import { UserAuthorizationDTO } from '@/interfaces/userGroup';
declare const _default: {
    resetUserForm(context: any): void;
    resetGroupForm(context: any): void;
    resetRoleForm(context: any): void;
    resetOrganizationForm(context: any): void;
    updateUserField(context: any, { field, value }: {
        field: any;
        value: any;
    }): void;
    updateGroupField(context: any, { field, value }: {
        field: any;
        value: any;
    }): void;
    updateRoleField(context: any, { field, value }: {
        field: any;
        value: any;
    }): void;
    updateOrganizationField(context: any, { field, value }: {
        field: any;
        value: any;
    }): void;
    setUsersTablePage(context: any, page: any): void;
    setUsersTableSortBy(context: any, val: any): void;
    setUsersTableDescending(context: any, val: any): void;
    setUsersTableItemsPerPage(context: any, itemsPerPage: any): void;
    setGroupsTablePage(context: any, page: any): void;
    setGroupsTableSortBy(context: any, val: any): void;
    setGroupsTableDescending(context: any, val: any): void;
    setGroupsTableItemsPerPage(context: any, itemsPerPage: any): void;
    setRolesTablePage(context: any, page: any): void;
    setRolesTableItemsPerPage(context: any, itemsPerPage: any): void;
    setRolesTableSortBy(context: any, val: any): void;
    setRolesTableDescending(context: any, val: any): void;
    setModelRolesTablePage(context: any, page: any): void;
    setModelRolesTableSortBy(context: any, val: any): void;
    setModelRolesTableDescending(context: any, val: any): void;
    setDataRolesTablePage(context: any, page: any): void;
    setDataRolesTableSortBy(context: any, val: any): void;
    setDataRolesTableDescending(context: any, val: any): void;
    setDataRolesTableItemsPerPage(context: any, itemsPerPage: any): void;
    setOrgsTablePage(context: any, page: any): void;
    setOrgsTableSortBy(context: any, val: any): void;
    setOrgsTableDescending(context: any, val: any): void;
    setOrgsTableItemsPerPage(context: any, itemsPerPage: any): void;
    fetchUserGroupMembers(context: any, groupId: any): Promise<import("@/interfaces/user").UserInDTO[]>;
    fetchUsers(context: any, filter?: {
        page: number;
        pageSize: number;
        username: string;
        type: UserTypes;
    }): Promise<any[] | import("../interfaces/commons/pagination").PaginationRestDTO<import("@/interfaces/user").UserInDTO>>;
    fetchUsersWithPagination(context: any, filter?: {
        page: number;
        pageSize: number;
        username: string;
        type: string;
    }): Promise<any>;
    checkUserExists(context: any, username: string): Promise<boolean>;
    fetchUserByUsername(context: any, username: any): Promise<any[] | import("@/interfaces/user").UserInDTO>;
    fetchUserById(context: any, userId: any): Promise<any[] | import("@/interfaces/user").UserInDTO>;
    /**
     * Returns true if nameToCheck is duplicated,
     * false otherwise
     * @param context
     * @param nameToCheck Name to check
     */
    fetchDuplicateGroups(context: any, nameToCheck: any): Promise<boolean>;
    fetchGroups(context: any, filter?: {
        page: number;
        pageSize: number;
        name: string;
        adminOnly: boolean;
    }): Promise<any[] | import("../interfaces/commons/pagination").PaginationRestDTO<import("@/interfaces/userGroup").UserGroupInDTO>>;
    fetchGroupById(context: any, groupId: any): Promise<import("@/interfaces/userGroup").UserGroupInDTO>;
    fetchGroupsWithPagination(context: any, filter?: {
        page: number;
        pageSize: number;
        name: string;
    }): Promise<any>;
    fetchUserGroupsMine(context: any): Promise<any>;
    fetchRoles(context: any, filter?: RoleQueryParamsDTO): Promise<any[] | import("../interfaces/commons/pagination").PaginationRestDTO<import("../interfaces/role").DetailedRoleInDTO>>;
    /**
     * Returns true if duplicate name (id?) (not label), false otherwise
     * TODO: this will be correct only if ECC-863 will be closed
     * @param context
     * @param duplicateName name to check for duplicate
     */
    fetchDuplicatedApplicationRoles(context: any, duplicateName: any): Promise<boolean>;
    /**
    * Returns duplicate object if duplicate label (not name), false otherwise
    * The returned duplicate is useful to check if it is the same object being edited
    * TODO: this will be correct only if ECC-863 will be closed
    * @param context
    * @param duplicateLabel label to check for duplicate
    */
    fetchDuplicatedApplicationRolesLabel(context: any, duplicateLabel: any): Promise<boolean | import("../interfaces/role").DetailedRoleInDTO>;
    /**
     * Returns true if duplicate name (id?) (not label), false otherwise
     * TODO: this will be correct only if ECC-863 will be closed
     * @param context
     * @param duplicateName name to check for duplicate
     */
    fetchDuplicatedDeviceRoles(context: any, duplicateName: any): Promise<unknown>;
    /**
    * Returns duplicate object if duplicate label (not name), false otherwise
    * The returned duplicate is useful to check if it is the same object being edited
    * TODO: this will be correct only if ECC-863 will be closed
    * @param context
    * @param duplicateLabel label to check for duplicate
    */
    fetchDuplicatedDeviceRolesLabel(context: any, duplicateLabel: any): Promise<boolean | import("../interfaces/role").DetailedRoleInDTO>;
    fetchRolesWithPagination(context: any, filter?: {
        page: number;
        pageSize: number;
        label: string;
        type: RolesEnum;
    }): Promise<RoleInDTO[]>;
    fetchDataRolesWithPagination(context: any, filter?: {
        page: number;
        pageSize: number;
        label: string;
        type: RolesEnum;
        orderBy: string;
        orderDir: string;
    }): Promise<RoleInDTO[]>;
    fetchModelPaths(context: any, filter?: {
        page: number;
        pageSize: number;
    }): Promise<import("../interfaces/modelpath").ModelPathInDTO[]>;
    createModelPath(context: any, modelPathData: any): Promise<import("../interfaces/modelpath").ModelPathInDTO>;
    resetOrganizationsGlobalSelectorPagination(context: any): void;
    fetchOrganizationsGlobalSelector(context: any, filter?: {
        page: number;
        pageSize: number;
    }): Promise<any>;
    fetchOrganizationsDataTable(context: any, filter?: {
        page: number;
        pageSize: number;
        name: string;
        search: string;
        orderBy: string;
        orderDir: string;
    }): Promise<any>;
    /**
     * Returns true if organization name is already taken,
     * false otherwise
     * @param context
     * @param parentOrgId the organization Id to check within: the search happens on sub organizations of this org
     *                    otherwise the search has to happen on resourceId but there is no API for that at the moment
     * @param subOrgNameToCheck the name of the organization to check
     */
    fetchDuplicateOrganizations(context: any, { parentOrgId, subOrgNameToCheck }: {
        parentOrgId: any;
        subOrgNameToCheck: any;
    }): Promise<boolean>;
    /**
     * Returns true if organization hostname is already taken,
     * false otherwise
     * @param context
     * @param hostnameToCheck the name of the organization to check
     */
    fetchDuplicateOrganizationHostname(context: any, hostnameToCheck: any): Promise<boolean>;
    fetchOrganizations(context: any, payload?: {
        filter: {
            page: number;
            pageSize: number;
            name: string;
            search: string;
            orderBy: string;
            orderDir: string;
        };
        useSelectedSuborg: boolean;
        ignoreResources: boolean;
    }): Promise<import("../interfaces/commons/pagination").PaginationRestDTO<OrganizationInDTO>>;
    fetchSubOrganizations(context: any, filter?: {
        page: number;
        pageSize: number;
        name: string;
        orderBy: string;
        orderDir: string;
        organizationId: any;
    }): Promise<OrganizationInDTO[]>;
    fetchCurrentSubOrgResources(context: any, params?: {
        forceUpdate: boolean;
    }): Promise<any[]>;
    fetchRole(context: any, roleId: any): Promise<import("../interfaces/role").DetailedRoleInDTO>;
    fetchDataRolesPermission(context: any, roles: any): Promise<void>;
    fetchModelPathPermissions(context: any, { roleId, filter }: {
        roleId: any;
        filter: any;
    }): Promise<any>;
    fetchDataRolePermissionIfNeeded(context: any, role: any): Promise<void>;
    deleteDataRolePermissionCache(context: any, devicePermissionId: any): void;
    resetDataRolePermissionCache(context: any): void;
    fetchAdditionalUsersData(context: any, users: any): void;
    fetchAdditionalUserDataIfNeeded(context: any, user: any): Promise<void>;
    fetchAdditionalGroupsData(context: any, groups: any): void;
    fetchAdditionalGroupDataIfNeeded(context: any, groupId: any): Promise<void>;
    fetchUserRoleIfNeedeed(context: any, userId: any): Promise<void>;
    fetchUserRoles(context: any, userId: any): Promise<void>;
    createUser(context: any, userData: any): Promise<import("@/interfaces/user").UserInDTO>;
    updateUser(context: any, data: {
        passwordChangeInvitation: any;
        userId: any;
        newEmail: any;
        newPassword: any;
        groupPoliciesEnabled: any;
    }): Promise<import("@/interfaces/user").UserInDTO>;
    createUserGroup(context: any, userGroupData: any): Promise<import("@/interfaces/userGroup").UserGroupInDTO>;
    selectOrganization(context: any, organization: any): void;
    fetchCurrentUserOrganizations(context: any): Promise<void>;
    saveCurrentUserOrganizations(context: any, organizations: any): Promise<void>;
    addUserToGroup(context: any, { userGroupId, userId, role }: {
        userGroupId: any;
        userId: any;
        role: any;
    }): Promise<import("@/interfaces/userGroup").UserGroupInDTO>;
    addRolesToGroup(context: any, { userGroupId, roleIds }: {
        userGroupId: any;
        roleIds: any;
    }): Promise<import("@/interfaces/userGroup").UserGroupInDTO>;
    removeUserFromGroup(context: any, { userGroupId, userId }: {
        userGroupId: any;
        userId: any;
    }): Promise<import("@/interfaces/userGroup").UserGroupInDTO>;
    removeRolesFromGroup(context: any, { userGroupId, roleIds }: {
        userGroupId: any;
        roleIds: any;
    }): Promise<import("@/interfaces/userGroup").UserGroupInDTO>;
    verifyApplicationPermissionChanges(context: any, { groupsToAdd, rolesToAdd, groupsToRemove, rolesToRemove }: {
        groupsToAdd: any;
        rolesToAdd: any;
        groupsToRemove: any;
        rolesToRemove: any;
    }): Promise<string[]>;
    fetchOrganization(context: any, organizationId: any): Promise<OrganizationInDTO>;
    fetchAllApplicationPermissions(context: any): Promise<import("../interfaces/applicationpermission").ApplicationPermissionInDTO[]>;
    fixAllDevicesGroupLabel(context: any, groups: any): void;
    fetchSecurityPolicyGroups(context: any, myFilter?: {
        page: number;
        pageSize: number;
        name: any;
    }): Promise<import("../interfaces/commons/pagination").PaginationRestDTO<import("../interfaces/securitypolicy").SecurityPolicyInDTO>>;
    getUserSecurityPolicyGroups(context: any, filter?: {
        userId: any;
    }): Promise<import("../interfaces/securitypolicy").SecurityPolicyInDTO[]>;
    createSecurityPolicyGroup(context: any, securityPolicyData: any): Promise<import("../interfaces/securitypolicy").SecurityPolicyInDTO>;
    fetchSecurityPolicyGroup(context: any, securityPolicyGroupId: any): Promise<import("../interfaces/securitypolicy").SecurityPolicyInDTO>;
    updateSecurityPolicyGroup(context: any, { securityPolicyGroupId, securityPolicyGroupData }: {
        securityPolicyGroupId: any;
        securityPolicyGroupData: any;
    }): Promise<import("../interfaces/securitypolicy").SecurityPolicyInDTO>;
    deleteSecurityPolicyGroup(context: any, securityPolicyGroupId: any): Promise<any>;
    addDeviceToSecurityGroup(context: any, { securityPolicyGroupId, deviceId }: {
        securityPolicyGroupId: any;
        deviceId: any;
    }): Promise<import("../interfaces/securitypolicy").SecurityPolicyInDTO>;
    removeDeviceFromSecurityGroup(context: any, { securityPolicyGroupId, deviceId }: {
        securityPolicyGroupId: any;
        deviceId: any;
    }): Promise<import("../interfaces/securitypolicy").SecurityPolicyInDTO>;
    createRole(context: any, roleData: any): Promise<any>;
    createRoleInSubOrganization(context: any, { organizationId, roleData }: {
        organizationId: any;
        roleData: any;
    }): Promise<RoleInDTO>;
    createDataRole(context: any, roleData: any): Promise<any>;
    updateDataRole(context: any, { roleId, roleData }: {
        roleId: any;
        roleData: any;
    }): Promise<any>;
    deleteUserGroup(context: any, userGroupId: any): Promise<import("@/interfaces/userGroup").UserGroupInDTO>;
    deleteUser(context: any, userId: any): Promise<import("@/interfaces/user").UserInDTO>;
    deleteRole(context: any, roleId: any): Promise<import("../interfaces/role").DetailedRoleInDTO>;
    createSubOrg(context: any, { organizationId, orgData, options }: {
        organizationId: any;
        orgData: any;
        options: any;
    }): Promise<OrganizationInDTO>;
    selectCurrentOrganization(context: any, organization: OrganizationInDTO): Promise<void>;
    resetUserRolesCache(context: any): void;
    resetGroupRolesCache(context: any): void;
    updateRole(context: any, { roleId, roleData }: {
        roleId: number;
        roleData: RoleUpdateDTO;
    }): Promise<RoleInDTO>;
    starRole(context: any, { roleId, defaultStar }: {
        roleId: number;
        defaultStar: boolean;
    }): Promise<any>;
    updateOrganization(context: any, { organizationId, organizationData }: {
        organizationId: any;
        organizationData: any;
    }): Promise<OrganizationInDTO>;
    deleteOrganization(context: any, organizationId: any): Promise<OrganizationInDTO>;
    updateUserGroup(context: any, { userGroupId, userGroupData }: {
        userGroupId: any;
        userGroupData: any;
    }): Promise<import("@/interfaces/userGroup").UserGroupInDTO>;
    getPermissions(context: any, token: any): Promise<{
        permissions: import("../interfaces/utils").ParsedData[];
    }>;
    setUserPermissions(context: any, { decoded, access_token }: {
        decoded: any;
        access_token: any;
    }): Promise<void>;
    getLoginInfo(context: any, organizationHostname: any): Promise<import("../interfaces/organization").OrganizationLoginInfoDTO>;
    userSelfOnboarding(context: any, userData: any): Promise<void>;
    askRevokePermissionConfirmation(context: any, permissionsRemoved: []): Promise<unknown>;
    fetchServiceAccountClientSecret(context: any, clientId: any): Promise<SecretOutDto>;
    refreshServiceAccountClientSecret(context: any, clientId: any): Promise<SecretOutDto>;
    /**********************************************************************
     *  AGREEMENTS
     **********************************************************************/
    fetchAgreements(_context: any, orgId: number): Promise<AgreementOutDTO[]>;
    checkAgreements(_context: any, orgId: number): Promise<CheckAgreementOutDTO>;
    acceptAgreements(_context: any, args: {
        orgId: number;
        idsToAccept: number[];
    }): Promise<AgreementOutDTO[]>;
    setAgreementsReminderShownInSession(context: any, shown: boolean): void;
    setLoginError(context: any, loginError: string | null): void;
    /**********************************************************************
    *  GLOBAL NOTIFICATIONS
    **********************************************************************/
    fetchGlobalNotifications(_context: any, orgId: number): Promise<AgreementOutDTO[]>;
    checkGlobalNotifications(_context: any, orgId: number): Promise<CheckAgreementOutDTO>;
    acceptGlobalNotifications(_context: any, args: {
        orgId: number;
        idsToAccept: number[];
    }): Promise<AgreementOutDTO[]>;
    /**********************************************************************
    *  USER PREFERENCES
    *
    *  nb: ForLoginOrganization methods are used for vpn-user preferences
    *  because the vpn app always sends the selected organization to backend
    *  and not the sub organization in the username
    **********************************************************************/
    getUserPreferences(context: any, params: any): Promise<import("@/interfaces/user").UserPreferenceInDTO>;
    getUserPreferencesForLoginOrganization(context: any, params: any): Promise<import("@/interfaces/user").UserPreferenceInDTO>;
    postUserPreferences(context: any, params: any): Promise<unknown>;
    postUserPreferencesForLoginOrganization(context: any, params: any): Promise<unknown>;
    deleteUserPreferences(context: any, userPrefId: any): Promise<any>;
    deleteUserPreferencesForLoginOrganization(context: any, userPrefId: any): Promise<any>;
    deleteAllUserPreferences(context: any, userPrefIds: number[]): Promise<void>;
    /**********************************************************************
    *  USER Api KEYS
    **********************************************************************/
    getUserApiKeys(context: any, username: string): Promise<import("@/interfaces/user").ApiKeyInDTO>;
    createUserApiKey(context: any, params: {
        username: string;
    }): Promise<unknown>;
    deleteUserApiKey(context: any, params: {
        id: number;
        username: string;
    }): Promise<any>;
    fetchUserRealms(): Promise<RealmOutDTO[]>;
    fetchOrganizationGrants(context: any, params: {
        parentOrg: string;
    }): Promise<OrganizationGrantDTO>;
    refreshToken(context: any): Promise<void>;
    getDeviceAuthorization(context: any, { deviceId, groupName, noCache }: {
        deviceId?: string;
        groupName?: string;
        noCache?: boolean;
    }): Promise<UserAuthorizationDTO>;
    getDevicesAuthorizations(context: any, { deviceIds, noCache }: {
        deviceIds: string[];
        noCache?: boolean;
    }): Promise<Record<string, UserAuthorizationDTO>>;
};
export default _default;
