import { Product, LicenseDTO, PageSubscriptionSummaryDTO, SubscriptionAggregatedOutputDTO } from "../communication/axios/model/Product";
declare const _default: {
    fetchCurrentSubscription({ dispatch }: {
        dispatch: any;
    }): Promise<any>;
    fetchSubscription(context: any, orgResId: any): Promise<any>;
    fetchSubscriptionSummary(context: any, orgResId: any): Promise<any>;
    fetchSubscriptionAggregated(context: any, { orgResourceId, includeSharedResources }: {
        orgResourceId: string;
        includeSharedResources: boolean;
    }): Promise<SubscriptionAggregatedOutputDTO[]>;
    fetchSubscriptionAggregatedGroupedByOrg(context: any, { orgResourceIds, includeSharedResources }: {
        orgResourceIds: string[];
        includeSharedResources: boolean;
    }): Promise<Record<string, SubscriptionAggregatedOutputDTO[]>>;
    fetchOrganization(context: any, orgResId: any): Promise<any>;
    updateOrganization(context: any, { orgResId, dealer, hasOwnResources }: {
        orgResId: any;
        dealer: any;
        hasOwnResources: any;
    }): Promise<any>;
    fetchProduct(context: any, id: any): Promise<any>;
    fetchProducts(context: any): Promise<any>;
    fetchAllProducts(context: any): Promise<any>;
    getSubscriptionsSummaryByOrg(context: any, filter: any): Promise<PageSubscriptionSummaryDTO>;
    isProductLabelAvailable(_context: any, label: any): Promise<boolean>;
    fetchExpirationDate(context: any, licenseCode: string): Promise<any>;
    createLicense(context: any, data: LicenseDTO): Promise<unknown>;
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
    createProduct(context: any, data: Product): Promise<any>;
    updateProduct(context: any, data: {
        id: number;
        product: Product;
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
export default _default;
