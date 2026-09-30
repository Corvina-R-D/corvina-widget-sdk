declare const _default: {
    namespaced: boolean;
    state: {
        currentSubscription: any;
        products: any[];
        productForTrial: any;
        clientsLicenses: any[];
        clientsLicensesPagination: {
            number: number;
            totalPages: number;
            totalElements: number;
            last: boolean;
        };
        licensesPool: any[];
        productsForLicensesPool: any[];
        needRefreshProduct: boolean;
        needRefreshClient: boolean;
    };
    mutations: {
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
    actions: {
        fetchCurrentSubscription({ dispatch }: {
            dispatch: any;
        }): Promise<any>;
        fetchSubscription(context: any, orgResId: any): Promise<any>;
        fetchSubscriptionSummary(context: any, orgResId: any): Promise<any>;
        fetchSubscriptionAggregated(context: any, { orgResourceId, includeSharedResources }: {
            orgResourceId: string;
            includeSharedResources: boolean;
        }): Promise<import("../communication/axios/model/Product").SubscriptionAggregatedOutputDTO[]>;
        fetchSubscriptionAggregatedGroupedByOrg(context: any, { orgResourceIds, includeSharedResources }: {
            orgResourceIds: string[];
            includeSharedResources: boolean;
        }): Promise<Record<string, import("../communication/axios/model/Product").SubscriptionAggregatedOutputDTO[]>>;
        fetchOrganization(context: any, orgResId: any): Promise<any>;
        updateOrganization(context: any, { orgResId, dealer, hasOwnResources }: {
            orgResId: any;
            dealer: any;
            hasOwnResources: any;
        }): Promise<any>;
        fetchProduct(context: any, id: any): Promise<any>;
        fetchProducts(context: any): Promise<any>;
        fetchAllProducts(context: any): Promise<any>;
        getSubscriptionsSummaryByOrg(context: any, filter: any): Promise<import("../communication/axios/model/Product").PageSubscriptionSummaryDTO>;
        isProductLabelAvailable(_context: any, label: any): Promise<boolean>;
        fetchExpirationDate(context: any, licenseCode: string): Promise<any>;
        createLicense(context: any, data: import("../communication/axios/model/Product").LicenseDTO): Promise<unknown>;
        updateLicenseAutoRenew(context: any, data: {
            licenseId: number;
            autoRenew: boolean;
        }): Promise<boolean>;
        renewLicense(context: any, data: {
            licenseId: number;
        }): Promise<boolean>;
        deleteLicense(context: any, licenseId: any): Promise<boolean>;
        activateLicense(context: any, data: {
            licenseCode: string;
            orgResourceId: string;
        }): Promise<any>;
        fetchLicensesCount(context: any): Promise<any>;
        fetchLicenses(context: any, data: {
            orgResId: string;
            args?: any;
        }): Promise<any>;
        fetchAllLicenses(context: any, data: {
            orgResId: string;
            args?: any;
        }): Promise<any>;
        fetchLicensesByProductCode(context: any, data: {
            orgResId: string;
            args?: any;
        }): Promise<any>;
        fetchLicense(context: any, data: {
            orgResId: string;
            licenseId: number;
        }): Promise<any>;
        createProduct(context: any, data: import("../communication/axios/model/Product").Product): Promise<any>;
        updateProduct(context: any, data: {
            id: number;
            product: import("../communication/axios/model/Product").Product;
        }): Promise<any>;
        deleteProduct(context: any, productId: any): Promise<boolean>;
        setProductForTrial(context: any, productForTrial: any): void;
        resetClientsLicenses(context: any): void;
        resetLicensesPool(context: any): void;
        deleteLicenseInLicensePool(context: any, licenseId: any): void;
        addLicensesToLicensesPool(context: any, licenses: any): void;
        addProductForLicensesPool(context: any, product: any): Promise<void>;
        resetProductsForLicensesPool(context: any): void;
        fetchTrialExpiration(context: any, orgResId: any): Promise<number>;
        setNeedRefreshProduct(context: any, value: boolean): void;
        setNeedRefreshClient(context: any, value: boolean): void;
    };
    getters: {
        currentSubscription(state: any): any;
        getProducts(state: any): any;
        getProductForTrial(state: any): any;
        getClientsLicenses(state: any): any;
        getClientsLicensesPagination(state: any): any;
        getLicensesPool(state: any): any;
        getProductsForLicensesPool(state: any): any;
        getNeedRefreshProduct(state: any): any;
        getNeedRefreshClient(state: any): any;
    };
};
export default _default;
