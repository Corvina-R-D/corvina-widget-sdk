import { PageableFullDTO } from "./generic";
export interface Product {
    id?: number;
    code: string;
    label: string;
    resources: ProductResource[];
    type: ProductType;
    trial: boolean;
    lastVersion?: boolean;
    autorenewDefaultValueForNewLicenses: boolean;
}
export declare enum ProductType {
    STANDARD = "STANDARD",
    PLUS = "PLUS"
}
export interface ProductResource {
    duration: number;
    quantity: number;
    resourceType: ProductResourceType;
}
export interface ProductResourceUse extends ProductResource {
    used: number;
    granted?: number;
    grantedUsed?: number;
    lastUpdateFreeQuantity?: number;
    licensed?: number;
    warnLevel?: number;
}
export declare enum ProductResourceType {
    USERS = "USERS",
    ORGANIZATIONS = "ORGANIZATIONS",
    DEVICES = "DEVICES",
    DEVICE_DATA = "DEVICE_DATA",
    DEVICE_VPN = "DEVICE_VPN",
    CREDITS = "CREDITS"
}
export declare function isConsumableResource(resourceType: ProductResourceType): boolean;
export interface ResourceLimit {
    orgResourceId: string;
    quantity: number;
    used: number;
    resourceType: ProductResourceType;
}
export interface ResourceLimitOutDTO {
    expired: false;
    grantingOrganization: string;
    quantity: number;
    resourceType: ProductResourceType;
    targetOrganization: string;
    used: number;
    granted?: number;
    grantedUsed?: number;
    valid: boolean;
}
export interface LicenseDTO {
    autorenew: boolean;
    currency: string;
    expirationDate: number;
    externalRef: string;
    price: number;
    productId: number;
    targetOrgResourceId?: string;
}
export interface License {
    activationDate: number;
    product: Product;
    autorenew: boolean;
}
export interface LicenseByBuyerOrg {
    id: number;
    name: string;
    orgCoreId: number;
    vpnEnabled: boolean;
    dealer: boolean;
    deleted: boolean;
}
export interface SubscriptionResourceDTO {
    resourceType: ProductResourceType;
    quantity: number;
    used: number;
    expired: boolean;
}
export interface LicenseByBuyer {
    autorenew: boolean;
    activationDate: number;
    code: string;
    creationDate: number;
    currency: string;
    licenseId: number;
    expired?: boolean;
    targetOrganization?: LicenseByBuyerOrg;
    organization: LicenseByBuyerOrg;
    product: {
        code: string;
        creationDate: number;
        dealer: boolean;
        id: number;
        label: string;
    };
    subscription: {
        activationDate: number;
        autorenew: boolean;
        creationDate: number;
        expirationDate: number;
        licenseId: number;
        productCode: string;
        productLabel: string;
        productType: ProductType;
        validity: number;
        resources: SubscriptionResourceDTO[];
    };
    price: number;
    used: boolean;
}
export interface SubscriptionSummaryDTO {
    creationDate: number;
    orgResourceId: string;
    expirationDate: number;
    activationDate: number;
    validity: number;
    licenseId: number;
    productId: number;
    licenseCode: string;
    productCode: string;
    productLabel: string;
    currency: string;
    price: number;
    productType: ProductType;
    resources: SubscriptionResourceDTO[];
    autorenew: boolean;
    trial: boolean;
}
export interface PageSubscriptionSummaryDTO extends PageableFullDTO {
    content: SubscriptionSummaryDTO[];
}
export interface SubscriptionAggregatedOutputDTO extends SubscriptionResourceDTO {
    org: string;
    granted: number;
    licensed?: number;
    grantedUsed?: number;
    resourceType: ProductResourceType;
    lastUpdateFreeQuantity?: number;
}
export declare const DEFAULT_VPN_CREDITS_UNIT: number;
export declare const DEFAULT_IOT_CREDITS_UNIT = 4096;
export declare const DEFAULT_VPN_CREDITS_UNIT_NAME = "months";
export declare const DEFAULT_PRODUCT_VALIDITY: number;
export declare const DEFAULT_CREDITS_GENERIC_UNIT = 1000;
export declare const scaleResource: (resource: {
    resourceType: ProductResourceType;
    quantity?: number;
    usage?: number;
    used?: number;
    grantedUsed?: number;
    licensed?: number;
    granted?: number;
    free?: number;
    lastUpdateFreeQuantity?: number;
    duration?: number;
}, rounding?: (x: number) => number) => {
    resourceType: ProductResourceType;
    quantity?: number;
    usage?: number;
    used?: number;
    grantedUsed?: number;
    licensed?: number;
    granted?: number;
    free?: number;
    lastUpdateFreeQuantity?: number;
    duration?: number;
};
export declare const unscaleResource: (resource: {
    resourceType: ProductResourceType;
    quantity?: number;
    used?: number;
    grantedUsed?: number;
    licensed?: number;
    granted?: number;
    lastUpdateFreeQuantity?: number;
    duration?: number;
    unscaledUsed?: number;
}, rounding?: (x: number) => number) => {
    resourceType: ProductResourceType;
    quantity?: number;
    used?: number;
    grantedUsed?: number;
    licensed?: number;
    granted?: number;
    lastUpdateFreeQuantity?: number;
    duration?: number;
    unscaledUsed?: number;
};
export declare const formatResource: (resource: ProductResourceUse, showPercent: boolean) => {
    num: string;
    denum: string;
    numRaw: number;
    denumRaw: number;
    ratio: number;
    warnLevel: number;
    text: string;
    tooltip: string;
};
