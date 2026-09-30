import { DevicePermissionsCache } from './VPNApp-store';
declare const _default: {
    namespaced: boolean;
    state: {
        iot: boolean;
        vpn: boolean;
        vpnPairingMode: string;
        otpRequired: boolean;
        organizations: {
            data: any[];
            pagination: {};
            currentUserOrg: any[];
            selectedOrganization: any;
            selectedSubOrganization: any;
            orgsTablePagination: {
                page: number;
            };
            globalSelectorOrganizations: {
                lastPage: boolean;
                pageNum: number;
                data: any[];
            };
            controllerData: any[];
            currentResources: any;
        };
        currentFormUser: {
            email: string;
            username: string;
            type: string;
            name: string;
            organization: string;
            roles: string;
            accessToken: string;
            accessSecret: string;
            organizationRoles: any[];
            groupsMember: any[];
            isServiceAccessUser: boolean;
        };
        currentFormGroup: {
            name: string;
            description: string;
            organizationRoles: any[];
            users: any[];
        };
        currentFormRole: {
            name: string;
            id: string;
            description: string;
            owner: string;
            permissions: any[];
        };
        currentFormOrganization: {
            name: string;
            id: string;
            url: string;
        };
        users: {
            data: any[];
            pagination: {};
            cachedUserRolesMap: {};
            userDataCache: {};
            usersTablePagination: {
                page: number;
            };
        };
        userGroups: {
            data: any[];
            groupDataCache: {};
            pagination: {};
            groupsTablePagination: {
                page: number;
            };
            expanded: {};
        };
        userGroupsMine: any[];
        roles: {
            data: any[];
            pagination: {};
            rolesTablePagination: {
                page: number;
            };
        };
        dataRoles: {
            data: any[];
            pagination: {};
            dataRolesPermissionCache: {};
            dataRolesTablePagination: {
                page: number;
            };
        };
        modelRoles: {
            data: any[];
            pagination: {};
            modelRolesTablePagination: {
                page: number;
            };
        };
        applicationPermissions: {
            data: any[];
            pagination: {};
        };
        devicePermissions: {
            data: any[];
            infiniteLoadingListIdentifier: number;
            pagination: {};
        };
        hasRptToken: boolean;
        loginError: string | null;
        agreements: {
            reminderShownInSession: boolean;
        };
        trial: {
            expirationDate: any;
        };
        access_token: any;
        refreshPermissionsRequired: number;
        deviceAuthorizationCache: DevicePermissionsCache;
    };
    mutations: {
        RESET_USER_FORM(state: any): void;
        RESET_GROUP_FORM(state: any): void;
        RESET_ROLE_FORM(state: any): void;
        RESET_ORGANIZATION_FORM(state: any): void;
        UPDATE_USER_FIELD(state: any, { field, value }: {
            field: any;
            value: any;
        }): void;
        UPDATE_GROUP_FIELD(state: any, { field, value }: {
            field: any;
            value: any;
        }): void;
        UPDATE_ROLE_FIELD(state: any, { field, value }: {
            field: any;
            value: any;
        }): void;
        UPDATE_ORGANIZATION_FIELD(state: any, { field, value }: {
            field: any;
            value: any;
        }): void;
        SAVE_USERS(state: any, data: any): void;
        SAVE_USERS_PAGINATION(state: any, pagination: any): void;
        SAVE_USER_GROUPS(state: any, data: any): void;
        SAVE_USER_GROUPS_PAGINATION(state: any, pagination: any): void;
        SAVE_USER_GROUPS_MINE(state: any, data: any): void;
        SAVE_ROLES(state: any, data: any): void;
        SAVE_MODEL_ROLES(state: any, data: any): void;
        SAVE_DATA_ROLES(state: any, data: any): void;
        SAVE_DATA_ROLES_PAGINATION(state: any, pagination: any): void;
        SAVE_ROLES_PAGINATION(state: any, pagination: any): void;
        SAVE_MODEL_ROLES_PAGINATION(state: any, pagination: any): void;
        SELECT_ORGANIZATION_ID(state: any, organization: any): void;
        SAVE_CURRENT_USER_ORGANIZATIONS(state: any, data: any): void;
        SAVE_ORGANIZATIONS(state: any, data: any): void;
        SAVE_ORGANIZATIONS_CONTROLLERS(state: any, data: Array<any>): void;
        SAVE_CURRENT_RESOURCES(state: any, resources: any): void;
        APPEND_ORGANIZATIONS_GLOBAL_SELECTOR(state: any, arNewOrgs: any): void;
        SAVE_ORGANIZATIONS_GLOBAL_SELECTOR(state: any, organizations: any): void;
        SAVE_ORGANIZATIONS_GLOBAL_SELECTOR_LASTPAGE(state: any, isLastPage: any): void;
        SAVE_ORGANIZATIONS_GLOBAL_SELECTOR_PAGENUM(state: any, pageNum: any): void;
        SELECT_CURRENT_ORGANIZATION(state: any, organization: any): void;
        SAVE_ORGANIZATION_PAGINATION(state: any, pagination: any): void;
        SAVE_CACHED_ROLES_MAP(state: any, { userId, userRoles }: {
            userId: any;
            userRoles: any;
        }): void;
        SAVE_CACHED_ORGANIZATIONS_MAP(state: any, { groupId, organization }: {
            groupId: any;
            organization: any;
        }): void;
        SAVE_CACHED_ORGANIZATIONS_ROLES_MAP(state: any, { roleId, organization }: {
            roleId: any;
            organization: any;
        }): void;
        SAVE_PERMISSIONS(state: any, data: any): void;
        SAVE_PERMISSIONS_PAGINATION(state: any, pagination: any): void;
        RESET_USER_ROLES_CACHE(state: any): void;
        RESET_GROUP_ROLES_CACHE(state: any): void;
        SET_USERS_TABLE_PAGE(state: any, page: any): void;
        SET_USERS_TABLE_SORTBY(state: any, val: any): void;
        SET_USERS_TABLE_DESCENDING(state: any, val: any): void;
        SET_USERS_TABLE_PAGE_SIZE(state: any, itemsPerPage: any): void;
        SET_GROUPS_TABLE_PAGE(state: any, page: any): void;
        SET_GROUPS_TABLE_SORTBY(state: any, val: any): void;
        SET_GROUPS_TABLE_DESCENDING(state: any, val: any): void;
        SET_GROUPS_TABLE_PAGE_SIZE(state: any, itemsPerPage: any): void;
        SET_ROLES_TABLE_PAGE(state: any, page: any): void;
        SET_ROLES_TABLE_PAGE_SIZE(state: any, itemsPerPage: any): void;
        SET_ROLES_TABLE_SORTBY(state: any, val: any): void;
        SET_ROLES_TABLE_DESCENDING(state: any, val: any): void;
        SET_ROLE_STAR(state: any, { roleId, defaultStar }: {
            roleId: any;
            defaultStar: any;
        }): void;
        SET_MODEL_ROLES_TABLE_PAGE(state: any, page: any): void;
        SET_MODEL_ROLES_TABLE_SORTBY(state: any, val: any): void;
        SET_MODEL_ROLES_TABLE_DESCENDING(state: any, val: any): void;
        SET_DATA_ROLES_TABLE_PAGE(state: any, page: any): void;
        SET_DATA_ROLES_TABLE_SORTBY(state: any, val: any): void;
        SET_DATA_ROLES_TABLE_DESCENDING(state: any, val: any): void;
        SET_DATA_ROLES_TABLE_PAGE_SIZE(state: any, itemsPerPage: any): void;
        SET_ORGS_TABLE_PAGE(state: any, page: any): void;
        SET_ORGS_TABLE_SORTBY(state: any, val: any): void;
        SET_ORGS_TABLE_DESCENDING(state: any, val: any): void;
        SET_ORGS_TABLE_PAGE_SIZE(state: any, val: any): void;
        RESET_DATA_ROLE_CACHE(state: any): void;
        DELETE_DATA_ROLE_CACHE_BY_ID(state: any, dataRoleId: any): void;
        SAVE_ADDITIONAL_USER_DATA(state: any, { userId, data }: {
            userId: any;
            data: any;
        }): void;
        SAVE_ADDITIONAL_GROUP_DATA(state: any, { groupId, data }: {
            groupId: any;
            data: any;
        }): void;
        SET_HAS_RPT_TOKEN(state: any, hasRptToken: any): void;
        SET_LOGIN_ERROR(state: any, loginError: string | null): void;
        SET_AGREEMENTS_REMINDER_SHOWN_IN_SESSION(state: any, shown: any): void;
        SET_TRIAL_EXPIRATION_DATE(state: any, expirationDate: any): void;
        SET_ACCESS_TOKEN(state: any, accessToken: any): void;
        SET_REFRESH_PERMISSIONS_REQUIRED(state: any): void;
        SET_DEVICE_AUTHORIZATION(state: any, { cacheKey, permissions }: {
            cacheKey: any;
            permissions: any;
        }): void;
        CLEAR_DEVICE_AUTHORIZATION_CACHE(state: any): void;
    };
    actions: {
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
        fetchUserGroupMembers(context: any, groupId: any): Promise<import("../interfaces/user").UserInDTO[]>;
        fetchUsers(context: any, filter?: {
            page: number;
            pageSize: number;
            username: string;
            type: import("../interfaces/user").UserTypes;
        }): Promise<any[] | import("../interfaces/commons/pagination").PaginationRestDTO<import("../interfaces/user").UserInDTO>>;
        fetchUsersWithPagination(context: any, filter?: {
            page: number;
            pageSize: number;
            username: string;
            type: string;
        }): Promise<any>;
        checkUserExists(context: any, username: string): Promise<boolean>;
        fetchUserByUsername(context: any, username: any): Promise<any[] | import("../interfaces/user").UserInDTO>;
        fetchUserById(context: any, userId: any): Promise<any[] | import("../interfaces/user").UserInDTO>;
        fetchDuplicateGroups(context: any, nameToCheck: any): Promise<boolean>;
        fetchGroups(context: any, filter?: {
            page: number;
            pageSize: number;
            name: string;
            adminOnly: boolean;
        }): Promise<any[] | import("../interfaces/commons/pagination").PaginationRestDTO<import("../interfaces/userGroup").UserGroupInDTO>>;
        fetchGroupById(context: any, groupId: any): Promise<import("../interfaces/userGroup").UserGroupInDTO>;
        fetchGroupsWithPagination(context: any, filter?: {
            page: number;
            pageSize: number;
            name: string;
        }): Promise<any>;
        fetchUserGroupsMine(context: any): Promise<any>;
        fetchRoles(context: any, filter?: import("../interfaces/role").RoleQueryParamsDTO): Promise<any[] | import("../interfaces/commons/pagination").PaginationRestDTO<import("../interfaces/role").DetailedRoleInDTO>>;
        fetchDuplicatedApplicationRoles(context: any, duplicateName: any): Promise<boolean>;
        fetchDuplicatedApplicationRolesLabel(context: any, duplicateLabel: any): Promise<boolean | import("../interfaces/role").DetailedRoleInDTO>;
        fetchDuplicatedDeviceRoles(context: any, duplicateName: any): Promise<unknown>;
        fetchDuplicatedDeviceRolesLabel(context: any, duplicateLabel: any): Promise<boolean | import("../interfaces/role").DetailedRoleInDTO>;
        fetchRolesWithPagination(context: any, filter?: {
            page: number;
            pageSize: number;
            label: string;
            type: import("../constant/Roles").default;
        }): Promise<import("../interfaces/role").RoleInDTO[]>;
        fetchDataRolesWithPagination(context: any, filter?: {
            page: number;
            pageSize: number;
            label: string;
            type: import("../constant/Roles").default;
            orderBy: string;
            orderDir: string;
        }): Promise<import("../interfaces/role").RoleInDTO[]>;
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
        fetchDuplicateOrganizations(context: any, { parentOrgId, subOrgNameToCheck }: {
            parentOrgId: any;
            subOrgNameToCheck: any;
        }): Promise<boolean>;
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
        }): Promise<import("../interfaces/commons/pagination").PaginationRestDTO<import("../interfaces/organization").OrganizationInDTO>>;
        fetchSubOrganizations(context: any, filter?: {
            page: number;
            pageSize: number;
            name: string;
            orderBy: string;
            orderDir: string;
            organizationId: any;
        }): Promise<import("../interfaces/organization").OrganizationInDTO[]>;
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
        createUser(context: any, userData: any): Promise<import("../interfaces/user").UserInDTO>;
        updateUser(context: any, data: {
            passwordChangeInvitation: any;
            userId: any;
            newEmail: any;
            newPassword: any;
            groupPoliciesEnabled: any;
        }): Promise<import("../interfaces/user").UserInDTO>;
        createUserGroup(context: any, userGroupData: any): Promise<import("../interfaces/userGroup").UserGroupInDTO>;
        selectOrganization(context: any, organization: any): void;
        fetchCurrentUserOrganizations(context: any): Promise<void>;
        saveCurrentUserOrganizations(context: any, organizations: any): Promise<void>;
        addUserToGroup(context: any, { userGroupId, userId, role }: {
            userGroupId: any;
            userId: any;
            role: any;
        }): Promise<import("../interfaces/userGroup").UserGroupInDTO>;
        addRolesToGroup(context: any, { userGroupId, roleIds }: {
            userGroupId: any;
            roleIds: any;
        }): Promise<import("../interfaces/userGroup").UserGroupInDTO>;
        removeUserFromGroup(context: any, { userGroupId, userId }: {
            userGroupId: any;
            userId: any;
        }): Promise<import("../interfaces/userGroup").UserGroupInDTO>;
        removeRolesFromGroup(context: any, { userGroupId, roleIds }: {
            userGroupId: any;
            roleIds: any;
        }): Promise<import("../interfaces/userGroup").UserGroupInDTO>;
        verifyApplicationPermissionChanges(context: any, { groupsToAdd, rolesToAdd, groupsToRemove, rolesToRemove }: {
            groupsToAdd: any;
            rolesToAdd: any;
            groupsToRemove: any;
            rolesToRemove: any;
        }): Promise<string[]>;
        fetchOrganization(context: any, organizationId: any): Promise<import("../interfaces/organization").OrganizationInDTO>;
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
        }): Promise<import("../interfaces/role").RoleInDTO>;
        createDataRole(context: any, roleData: any): Promise<any>;
        updateDataRole(context: any, { roleId, roleData }: {
            roleId: any;
            roleData: any;
        }): Promise<any>;
        deleteUserGroup(context: any, userGroupId: any): Promise<import("../interfaces/userGroup").UserGroupInDTO>;
        deleteUser(context: any, userId: any): Promise<import("../interfaces/user").UserInDTO>;
        deleteRole(context: any, roleId: any): Promise<import("../interfaces/role").DetailedRoleInDTO>;
        createSubOrg(context: any, { organizationId, orgData, options }: {
            organizationId: any;
            orgData: any;
            options: any;
        }): Promise<import("../interfaces/organization").OrganizationInDTO>;
        selectCurrentOrganization(context: any, organization: import("../interfaces/organization").OrganizationInDTO): Promise<void>;
        resetUserRolesCache(context: any): void;
        resetGroupRolesCache(context: any): void;
        updateRole(context: any, { roleId, roleData }: {
            roleId: number;
            roleData: import("../interfaces/role").RoleUpdateDTO;
        }): Promise<import("../interfaces/role").RoleInDTO>;
        starRole(context: any, { roleId, defaultStar }: {
            roleId: number;
            defaultStar: boolean;
        }): Promise<any>;
        updateOrganization(context: any, { organizationId, organizationData }: {
            organizationId: any;
            organizationData: any;
        }): Promise<import("../interfaces/organization").OrganizationInDTO>;
        deleteOrganization(context: any, organizationId: any): Promise<import("../interfaces/organization").OrganizationInDTO>;
        updateUserGroup(context: any, { userGroupId, userGroupData }: {
            userGroupId: any;
            userGroupData: any;
        }): Promise<import("../interfaces/userGroup").UserGroupInDTO>;
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
        fetchServiceAccountClientSecret(context: any, clientId: any): Promise<import("../interfaces/user").SecretOutDto>;
        refreshServiceAccountClientSecret(context: any, clientId: any): Promise<import("../interfaces/user").SecretOutDto>;
        fetchAgreements(_context: any, orgId: number): Promise<import("../interfaces/agreements").AgreementOutDTO[]>;
        checkAgreements(_context: any, orgId: number): Promise<import("../interfaces/agreements").CheckAgreementOutDTO>;
        acceptAgreements(_context: any, args: {
            orgId: number;
            idsToAccept: number[];
        }): Promise<import("../interfaces/agreements").AgreementOutDTO[]>;
        setAgreementsReminderShownInSession(context: any, shown: boolean): void;
        setLoginError(context: any, loginError: string | null): void;
        fetchGlobalNotifications(_context: any, orgId: number): Promise<import("../interfaces/agreements").AgreementOutDTO[]>;
        checkGlobalNotifications(_context: any, orgId: number): Promise<import("../interfaces/agreements").CheckAgreementOutDTO>;
        acceptGlobalNotifications(_context: any, args: {
            orgId: number;
            idsToAccept: number[];
        }): Promise<import("../interfaces/agreements").AgreementOutDTO[]>;
        getUserPreferences(context: any, params: any): Promise<import("../interfaces/user").UserPreferenceInDTO>;
        getUserPreferencesForLoginOrganization(context: any, params: any): Promise<import("../interfaces/user").UserPreferenceInDTO>;
        postUserPreferences(context: any, params: any): Promise<unknown>;
        postUserPreferencesForLoginOrganization(context: any, params: any): Promise<unknown>;
        deleteUserPreferences(context: any, userPrefId: any): Promise<any>;
        deleteUserPreferencesForLoginOrganization(context: any, userPrefId: any): Promise<any>;
        deleteAllUserPreferences(context: any, userPrefIds: number[]): Promise<void>;
        getUserApiKeys(context: any, username: string): Promise<import("../interfaces/user").ApiKeyInDTO>;
        createUserApiKey(context: any, params: {
            username: string;
        }): Promise<unknown>;
        deleteUserApiKey(context: any, params: {
            id: number;
            username: string;
        }): Promise<any>;
        fetchUserRealms(): Promise<import("../interfaces/realm").RealmOutDTO[]>;
        fetchOrganizationGrants(context: any, params: {
            parentOrg: string;
        }): Promise<import("../interfaces/organization").OrganizationGrantDTO>;
        refreshToken(context: any): Promise<void>;
        getDeviceAuthorization(context: any, { deviceId, groupName, noCache }: {
            deviceId?: string;
            groupName?: string;
            noCache?: boolean;
        }): Promise<import("../interfaces/userGroup").UserAuthorizationDTO>;
        getDevicesAuthorizations(context: any, { deviceIds, noCache }: {
            deviceIds: string[];
            noCache?: boolean;
        }): Promise<Record<string, import("../interfaces/userGroup").UserAuthorizationDTO>>;
    };
    getters: {
        getCurrentOrganizationIOTEnabled(state: any): any;
        getCurrentOrganizationVPNEnabled(state: any): any;
        getCurrentOrganizationOPTRequired(state: any): any;
        getCurrentOrganizationVPNPairingMode(state: any): any;
        getCurrentFormUser(state: any): any;
        getCurrentFormGroup(state: any): any;
        getCurrentFormRole(state: any): any;
        getCurrentFormOrganization(state: any): any;
        getUsers(state: any): any;
        getUserGroups(state: any): any;
        getUserGroupsMine(state: any): any;
        getRoles(state: any): any;
        getDataRoles(state: any): any;
        getModelRoles(state: any): any;
        getOrganizations(state: any): import("../interfaces/organization").CurrentUserOrganizations;
        getDevicePermissions(state: any): any;
        getCurrentUserOrg(state: any): any;
        getCurrentSubOrganizationController(state: any): any;
        getOrganizationController(state: any): (orgId: any) => any;
        getCurrentResources(state: any): any;
        getRouteQueryOrg(state: any): [string, string];
        getGlobalSelectorOrganizationsData(state: any): any;
        getGlobalSelectorOrganizationsIsLastPage(state: any): any;
        getGlobalSelectorOrganizationsPageNum(state: any): any;
        getHasRptToken(state: any): any;
        getLoginError(state: any): string | null;
        getAgreementsReminderShownInSession(state: any): any;
        getOrganizationAllowRegister(state: any, getters: any, rootState: any, rootGetters: any): boolean;
        getLoggedUser(state: any): any;
        getIsTrial(state: any): boolean;
        getTrialExpirationDate(state: any): any;
        getIsEditingSuborg(state: any): boolean;
        getSelectedOrganization(state: any): any;
        getSelectedSubOrganization(state: any): any;
        getAccessToken(state: any): any;
        getRefreshPermissionsRequired(state: any): number;
    };
};
export default _default;
