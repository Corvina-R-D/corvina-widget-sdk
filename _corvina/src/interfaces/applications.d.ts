import PaginationQueryParamsDTO from "./commons/PaginationQueryParamsDTO";
export declare const applicationServiceAccountPrefix = "sa-";
export declare const applicationServiceAccountDeviceAccessInfix = "deviceaccess-";
export interface ApplicationsQueryParamsDTO extends PaginationQueryParamsDTO {
    name: string;
}
export interface AppOrganizationsQueryParamsDTO extends PaginationQueryParamsDTO {
    name?: string;
    status?: APP_ORGANIZATION_STATUS;
}
export declare enum APP_STATUS {
    ACTIVE = "ACTIVE",
    UNDER_EVALUATION = "UNDER_EVALUATION"
}
export declare enum APP_ORGANIZATION_STATUS {
    INSTALLATION = "INSTALLATION",
    INSTALLED = "INSTALLED",
    INSTALLATION_FAILED = "INSTALLATION_FAILED",
    UNINSTALLATION = "UNINSTALLATION",
    UNINSTALLATION_FAILED = "UNINSTALLATION_FAILED",
    MANUAL_UPGRADABLE = "MANUAL_UPGRADABLE",
    FREE_TRIAL = "FREE_TRIAL",
    PAYMENT_REQUIRED = "PAYMENT_REQUIRED",
    RENEWAL_AND_PAYMENT_REQUIRED = "RENEWAL_AND_PAYMENT_REQUIRED",
    RENEWAL_REQUIRED = "RENEWAL_REQUIRED"
}
export declare namespace APP_ORGANIZATION_STATUS {
    function canDelete(status: APP_ORGANIZATION_STATUS): boolean;
    function canGoTo(status: APP_ORGANIZATION_STATUS): boolean;
    function canUpgrade(status: APP_ORGANIZATION_STATUS): boolean;
    function canChangePlan(status: APP_ORGANIZATION_STATUS): boolean;
    /**
     * A state is transient if it can be changed by the system without user intervention
     */
    function isItATransientState(status: APP_ORGANIZATION_STATUS): boolean;
    function isInFailureState(status: APP_ORGANIZATION_STATUS): boolean;
    function isInMoreDetailsAvailable(status: APP_ORGANIZATION_STATUS): boolean;
}
export declare function manifestToApplicationOutDTO(manifest: Manifest): ApplicationOutDTO;
export interface WebhookDetail {
    body?: string;
    message?: string;
    status?: string;
    success: boolean;
    timestamp: Date;
}
export declare enum MANUAL_UPGRADE_DETAIL_ITEM {
    SCOPES = "SCOPES",
    FREE = "FREE",
    DEPENDS_ON = "DEPENDS_ON",
    MAJOR = "MAJOR",
    PAYMENT_PLAN = "PAYMENT_PLAN",
    PAYMENT_PLAN_OPTIONS_ONLY = "PAYMENT_PLAN_OPTIONS_ONLY",
    PAYMENT_PLAN_CHANGES = "PAYMENT_PLAN_CHANGES",
    IN_APP_PURCHASES = "IN_APP_PURCHASES",
    DEVICE_ACCESS = "DEVICE_ACCESS",
    LINKED_ROLES_TOP = "LINKED_ROLES_TOP",
    LINKED_ROLES_ADDITIONAL = "LINKED_ROLES_ADDITIONAL",
    ADDITIONAL_ROLES = "ADDITIONAL_ROLES"
}
export interface ManualUpgradeDetail {
    items: MANUAL_UPGRADE_DETAIL_ITEM[];
    latestManifest: Manifest;
}
export declare enum APP_ORGANIZATION_MANIFEST_FROM {
    STORE = "STORE",
    CUSTOM = "CUSTOM"
}
export interface AppOrganizationOutDTO {
    id: number;
    organizationId: number;
    status: APP_ORGANIZATION_STATUS;
    createdAt: Date;
    updatedAt: Date;
    app: ApplicationOutDTO;
    webhookDetail?: WebhookDetail;
    manifestFrom: APP_ORGANIZATION_MANIFEST_FROM;
    manualUpgradeDetail?: ManualUpgradeDetail;
    canAccess: boolean;
    planId?: string;
    endDate?: Date;
    autoRenewActive?: boolean;
    freeTrial?: boolean;
    serviceAccountUsername?: string;
}
export interface ApplicationOutDTO extends Hooks {
    id: number;
    key: string;
    name: ManifestLocalizable;
    version: string;
    description: ManifestLocalizable;
    coverImageUrl: string;
    images: ApplicationOutImage[];
    translations?: ManifestTranslations;
    status: APP_STATUS;
    manifest: Manifest;
    planId?: string;
}
export interface NavigationDrawerPage {
    title: ManifestLocalizable;
    localizedTitle?: string;
    url: string;
    iconUrl: string;
    avoidCorvinaQueryParams?: boolean;
    children?: NavigationDrawerPage[];
}
export interface ManifestLocalizable {
    value: string;
    i18n?: string;
}
export interface ApplicationOutImage {
    url: string;
    thumbnailUrl: string;
}
export interface Authentication {
    type: string;
}
export interface Vendor {
    name: string;
    website: string;
    email?: string;
}
export interface Lifecycle {
    installed: string;
    uninstalled: string;
    upgradeOk?: string;
    upgradeKo?: string;
    renew?: string;
}
export interface Device {
    deviceGroups: string[];
    generalPermission: string;
    modelPermissions: string[];
}
export interface Scopes {
    applications: string[];
    devices: Device[];
    userImpersonation: boolean;
}
export interface GlobalPage {
    id: string;
    url: string;
    iconUrl: string;
    title: ManifestLocalizable;
    avoidCorvinaQueryParams?: boolean;
}
export interface Hooks {
    globalPage: GlobalPage;
    navigationDrawerPages?: NavigationDrawerPage[];
}
export interface ManifestLinks {
    self: string;
    changelog?: string;
}
export declare enum ManifestType {
    APP = "APP",
    WIDGET = "WIDGET"
}
export interface Manifest {
    key: string;
    name: ManifestLocalizable;
    description: ManifestLocalizable;
    status?: APP_STATUS;
    type: ManifestType;
    apiVersion: string;
    baseUrl: string;
    enableDeviceAccess: boolean;
    coverImageUrl: string;
    authentication: Authentication;
    vendor: Vendor;
    lifecycle: Lifecycle;
    scopes: Scopes;
    hooks: Hooks;
    dependsOn?: string[];
    free: boolean;
    inAppPurchases: boolean;
    paymentPlans: PaymentPlan[];
    translations: ManifestTranslations;
    links: ManifestLinks;
    additionalRoles: ManifestAdditionalRole[];
    linkedRoles: string[];
    hidden: boolean;
}
export declare class PaymentPlan {
    id: string;
    label: ManifestLocalizable;
    description: ManifestLocalizable;
    recurrent?: PaymentPlanRecurrent;
    trial?: PaymentPlanTrial;
    options?: PaymentPlanOption[];
    deprecated?: boolean;
    level?: number;
    selected?: boolean;
    private _amount;
    constructor(data: {
        id: string;
        label: ManifestLocalizable;
        description: ManifestLocalizable;
        amount: number;
        recurrent?: {
            period: string;
            amount: number;
        };
        trial?: PaymentPlanTrial;
        options?: PaymentPlanOption[];
        deprecated?: boolean;
        level?: number;
        selected?: boolean;
    });
    get amountFull(): number;
    get amount(): number;
}
export interface PaymentPlanOption {
    key: string;
    msg: ManifestLocalizable;
    val: any;
}
export interface PaymentPlanTrial {
    period: string;
}
export declare class PaymentPlanRecurrent {
    period: string;
    private _amount;
    constructor(data: {
        period: string;
        amount: number;
    });
    get amountFull(): number;
    get amount(): number;
}
export interface ManifestAdditionalRole {
    name: string;
    description: string;
    linkedRoles: string[];
}
export interface ManifestTranslations {
    urls: Record<string, string>;
}
export interface AppOrganizationCreateBodyDTO {
    users?: string[];
    manifest?: Manifest;
    appId?: number;
    planId?: string;
    devices?: number[];
}
export interface AppOrganizationUpgradeBodyDTO {
    planId?: string;
    devices?: number[];
}
export interface PreauthorizedCreditTransactionDTO {
    orderId: string;
    updatedAt?: Date;
    revokedBy?: string;
    authorizedBy?: string;
    targetWalletId: string;
    amount: number;
    sourceOrgResourceId?: string;
    sourceWalletId?: string;
    description?: string;
    executionMinTime?: Date;
    executionMaxTime?: Date;
    periodicity?: string;
    ordinal?: number;
    executionMaxOrdinal?: number;
    transactionSubjectType?: string;
    transactionSubjectRef?: string;
    transactionSubjectQuantity?: number;
    expectedPaymentsToDate?: number;
    actualPaymentsReceived?: number;
    nextPaymentDate?: Date;
    transactionData?: Record<string, Object>;
    id: number;
    orgResourceId: string;
    entityId?: number;
    entityStringId?: string;
    entityType?: string;
    state: string;
}
export interface CreditTransactionExecutionOrderDTO {
    id: number;
    transactionId?: number;
    preauthorizedCreditTransactionId: number;
    executionTime: Date;
    ordinal: number;
    executionResult: ExecutionResult;
    errorCode?: number;
    failureReason?: string;
    issuer: string;
}
export declare enum ExecutionResult {
    SUCCESS = "SUCCESS",
    FAILURE = "FAILURE",
    NOOP = "NOOP"
}
export interface PreauthorizedCreditTransactionRequestParams {
    page: number;
    pageSize: number;
    orderBy: string;
    orderDir: string;
    targetWalletId: string;
    states?: string[];
    transactionSubjectTypes?: string[];
    excludedTransactionSubjectTypes?: string[];
}
export interface CreditTransactionExecutionOrderRequestParams {
    page: number;
    pageSize: number;
    orderBy: string;
    orderDir: string;
    executionResults?: ExecutionResult[];
}
