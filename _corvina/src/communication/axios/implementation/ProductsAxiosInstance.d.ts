import AbstractAxiosInstance from "./AbstractAxiosInstance";
import { Product, LicenseDTO, PageSubscriptionSummaryDTO, SubscriptionAggregatedOutputDTO } from "../model/Product";
export interface ProductGetSubscriptionSummaryByOrgFilter {
    page: number;
    pageSize: number;
    organizationName?: string;
    expirationDateFrom?: number;
    expirationDateTo?: number;
    activationDateFrom?: number;
    activationDateTo?: number;
    includeNotRedeemed?: boolean;
    search?: string;
}
declare class ProductsAxiosInstance extends AbstractAxiosInstance {
    constructor();
    updateBaseUrl(): void;
    createProduct(product: Product): Promise<any>;
    updateProduct(id: number, product: Product): Promise<any>;
    deleteProduct(productId: string): Promise<any>;
    getProducts(productCode?: string, search?: string): Promise<any>;
    getAllProducts(productCode?: string): Promise<any>;
    getSubscriptionSummary(orgId: string): Promise<any>;
    getSubscription(orgId: string): Promise<any>;
    getSubscriptionAggregated(orgId: string): Promise<SubscriptionAggregatedOutputDTO[]>;
    getSubscriptionAggregatedGroupedByOrg(input: {
        organizations: string[];
    }): Promise<Record<string, SubscriptionAggregatedOutputDTO[]>>;
    getSubscriptionsSummaryByOrg(orgId: string, args: any): Promise<PageSubscriptionSummaryDTO>;
    getSubscriptionExpirationDate(licenseCode: string): Promise<any>;
    getOrganization(orgId: string): Promise<any>;
    putOrganization(orgId: string, dealer: boolean, hasOwnResources: boolean): Promise<any>;
    getLicenses(orgResId: string, args: any): Promise<any>;
    getAllLicenses(orgResId: string, args: any): Promise<any>;
    getLicense(orgResId: string, licenseId: any): Promise<any>;
    createLicense(license: LicenseDTO): Promise<unknown>;
    deleteLicense(licenseId: string): Promise<any>;
    updateLicenseAutorenew(licenseId: number, autoRenew: boolean): Promise<any>;
    renewLicense(licenseId: number): Promise<any>;
    activateLicense(orgId: string, licenseCode: string): Promise<any>;
    licensesCount(): Promise<any>;
    getProduct(id: number): Promise<any>;
    DBGPrintToken(): Promise<void>;
    getTrialExpiration(orgId: string): Promise<number>;
}
declare const _default: ProductsAxiosInstance;
export default _default;
