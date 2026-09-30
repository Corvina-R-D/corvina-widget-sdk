export declare enum RoleOwnerEnum {
    SYSTEM = "SYSTEM",
    ORGANIZATION = "ORGANIZATION",
    APPLICATION = "APPLICATION"
}
export declare namespace RoleOwnerEnum {
    function canEdit(roleOwner: RoleOwnerEnum): boolean;
    function canDelete(roleOwner: RoleOwnerEnum): boolean;
    /**
     * Returns the list of role that are created by the user of an organization or by corvina software automatically (es. when an organization is created)
     * @returns RoleOwnerEnum[] - SYSTEM, ORGANIZATION
     */
    function getByUserOrByCorvina(): RoleOwnerEnum[];
    function isByUserOrByCorvina(roleOwner: RoleOwnerEnum): boolean;
    /**
     * Returns the list of role created when an application is installed
     * @returns RoleOwnerEnum[] - APPLICATION
     */
    function getByAppStore(): RoleOwnerEnum[];
    function isByAppStore(roleOwner: RoleOwnerEnum): boolean;
}
