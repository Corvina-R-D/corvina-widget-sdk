declare const _default: {
    SET_CURRENT_SUBSCRIPTION(state: any, value: any): void;
    SET_PRODUCTS(state: any, products: any): void;
    SET_PRODUCT_FOR_TRIAL(state: any, productForTrial: any): void;
    ADD_CLIENTS_LICENSES(state: any, licenses: Array<any>): void;
    ADD_CLIENTS_LICENSES_PAGINATION(state: any, pagination: any): void;
    RESET_CLIENTS_LICENSES_PAGINATION(state: any): void;
    RESET_CLIENTS_LICENSES(state: any): void;
    ADD_LICENSES_POOL(state: any, licenses: Array<any>): void;
    RESET_LICENSES_POOL(state: any): void;
    DELETE_LICENSE_IN_LICENSE_POOL(state: any, licenseId: any): void;
    ADD_PRODUCT_FOR_LICENSES_POOL(state: any, product: any): void;
    RESET_PRODUCTS_FOR_LICENSES_POOL(state: any): void;
    SET_NEED_REFRESH_PRODUCT(state: any, value: any): void;
    SET_NEED_REFRESH_CLIENT(state: any, value: any): void;
};
export default _default;
