export declare enum UserOwnerEnum {
    ORGANIZATION = "ORGANIZATION",
    APP = "APP"
}
export declare namespace UserOwnerEnum {
    function canEdit(roleOwner: UserOwnerEnum): boolean;
    function canDelete(roleOwner: UserOwnerEnum): boolean;
}
