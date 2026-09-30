import PaginationQueryParamsDTO from './commons/PaginationQueryParamsDTO';
import { ResourceLimit, SubscriptionAggregatedOutputDTO } from '../communication/axios/model/Product';
import { OrganizationStatus } from '@/constant/Organizations';
export interface OrganizationInDTO extends OrganizationUpdateDTO {
    id: number;
    name: string;
    label: string;
    status: string;
    resourceId: string;
    hostnameAllowed: boolean;
}
export interface OrganizationUpdateDTO {
    privateAccess: boolean;
    allowDisablePrivateAccess: boolean;
    allowHostname?: boolean;
    hostname: string;
    dataEnabled: boolean;
    vpnEnabled: boolean;
    label: string;
    ipAddressesWhitelist?: string[];
    storeEnabled: boolean;
}
export interface OrganizationOutDTO extends OrganizationUpdateDTO {
    name: string;
    hostnameAllowed?: boolean;
    resourceId?: string;
}
export interface OrganizationQueryParamsDTO extends PaginationQueryParamsDTO {
    name?: string;
    search?: string;
    hostname?: string;
    orderBy?: string;
    orderDir?: string;
    userId?: number;
    includePrivateAccess?: boolean;
    onlyFirstLevel?: boolean;
}
export interface OrganizationLoginInfoDTO {
    realmName: string;
}
export interface OrganizationData {
    name?: string;
    label?: string;
    hostname?: string;
    allowDisablePrivateAccess?: boolean;
    allowHostname?: boolean;
    hostnameAllowed?: boolean;
    limits?: ResourceLimit[];
    hasOwnResources: boolean;
    ipAddressesWhitelist?: string[];
    dealer: boolean;
    id?: number;
    serial?: string;
    resourceId?: string;
    status?: OrganizationStatus;
    subscriptions?: SubscriptionAggregatedOutputDTO[];
    vpnEnabled: boolean;
    dataEnabled: boolean;
}
export interface CurrentUserOrganizations {
    currentUserOrg: OrganizationData[];
    controllerData: Array<any>;
    currentResources: SubscriptionAggregatedOutputDTO[];
    data: any;
    globalSelectorOrganizations: any;
    orgsTablePagination: any;
    pagination: any;
    selectedOrganization: OrganizationOutDTO;
    selectedSubOrganization: OrganizationOutDTO;
}
export interface OrganizationGrantDTO {
    allowEnableDealerOnSuborg: boolean;
    allowEnableHostnameOnSuborg: boolean;
    allowEnableOwnResourcesOnSuborg: boolean;
    allowEnableIotOnSuborg: boolean;
    allowEnableVpnOnSuborg: boolean;
    allowEnableStoreOnSuborg: boolean;
    allowEnableIpFilteringOnSuborg: boolean;
    allowEnablePrivateAccessOnSuborg: boolean;
}
export interface VerifyTokenOutDTO {
    verifyOutDTO: VerifyOutDto;
    orgResourceId: string | null;
    organizationName: string | null;
}
export interface VerifyOutDto {
    isValid: boolean;
    expirationDate: Date;
    errorMessage: string;
    organizationId: number;
}
