declare const _default: {
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
export default _default;
