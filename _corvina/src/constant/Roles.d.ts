declare enum RolesEnum {
    APPLICATION = "APPLICATION",// migrated to PLATFORM roles
    DATA = "DEVICE",
    DEVICE = "DEVICE"
}
export declare enum RolesPrefix {
    ROLEPLATFORM = "app_",// keep in sync with ROLESEPARATOR
    ROLEDATA = "data_",// keep in sync with ROLESEPARATOR
    ROLEAPP = "app_role-",
    ROLEAPPSA = "app_sa-role-",
    ROLEVPN = "vpn_",// keep in sync with ROLESEPARATOR
    ROLESEPARATOR = "_"
}
export declare enum DEVICE_ROLE_PERMISSION {
    NONE = "NONE",
    USER = "REGULAR_USER",
    ADMIN = "ADMINISTRATOR"
}
export default RolesEnum;
