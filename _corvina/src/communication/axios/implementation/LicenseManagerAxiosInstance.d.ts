import AbstractAxiosInstance from "./AbstractAxiosInstance";
import ILicenseManagerAxiosInstance from "../ILicenseManagerAxiosInstance";
import { ActivateDeviceLicenseOutDTO, ActivateDeviceLicenseInDTO, ActivationLicenseInDTO, ActivateDeviceLicenseVPNInDTO } from "@/interfaces/devicelicence";
import { PaginationRestDTO } from "@/interfaces/commons/pagination";
import { ConsumptionEntry, ConsumptionHistory } from "@/interfaces/consumptionsTable";
import { ProductResourceType } from "../model/Product";
import { PreauthorizedCreditTransactionInDTO, PreauthorizedCreditTransactionOutDTO } from "@corvina/corvina-app-connect/dist/common";
import { CreditTransactionExecutionOrderDTO, CreditTransactionExecutionOrderRequestParams, PreauthorizedCreditTransactionDTO, PreauthorizedCreditTransactionRequestParams } from "@/interfaces/applications";
export interface ConsumptionsFilter {
    aggregated?: boolean;
    deviceLabel?: string | string[];
    filterDate?: {
        end: string;
        start: string;
    };
    page?: number;
    pageSize?: number;
    resourceType?: ProductResourceType;
    includeSubOrgs?: boolean;
    includeSubOrgsBundled?: boolean;
    includeSubOrgsLicensed?: boolean;
    vpnBundleExpireAfter?: number;
    vpnBundleExpireBefore?: number;
}
declare class LicenseManagerAxiosInstance extends AbstractAxiosInstance implements ILicenseManagerAxiosInstance {
    constructor();
    updateBaseUrl(): void;
    activateDevice(data: ActivateDeviceLicenseOutDTO): Promise<ActivateDeviceLicenseInDTO>;
    checkActivationCode(activationKey: string): Promise<ActivationLicenseInDTO>;
    validateLicense(licenseCode: string): Promise<any>;
    deleteDeviceLicense(orgResourceId: String, deviceLicenseId: String): Promise<any>;
    fetchDeviceLicense(orgResourceId: String, deviceId: String): Promise<any>;
    fetchDeviceLicenses(orgResourceId: String, filter: any): Promise<PaginationRestDTO<ActivateDeviceLicenseInDTO>>;
    vpnActivate(data: ActivateDeviceLicenseVPNInDTO): Promise<ActivateDeviceLicenseInDTO>;
    vpnAutorenew(data: ActivateDeviceLicenseVPNInDTO): Promise<ActivateDeviceLicenseInDTO>;
    private dateToTs;
    fetchConsumptionTable(filter: ConsumptionsFilter): Promise<ConsumptionHistory | ConsumptionEntry>;
    fetchConsumptionGraph(filter: ConsumptionsFilter): Promise<ConsumptionHistory>;
    postPreauthorizedTransactions(data: PreauthorizedCreditTransactionInDTO[]): Promise<PreauthorizedCreditTransactionOutDTO[]>;
    fetchAppPreauthorizedTransactions(filter: PreauthorizedCreditTransactionRequestParams): Promise<PaginationRestDTO<PreauthorizedCreditTransactionDTO>>;
    fetchAppTransactionExecutionOrders(id: number, filter: CreditTransactionExecutionOrderRequestParams): Promise<PaginationRestDTO<CreditTransactionExecutionOrderDTO>>;
    revokePreauthorizedTransaction(id: number): Promise<any>;
    retryPayment(preauthorizedTransactionId: number, ordinal: number): Promise<CreditTransactionExecutionOrderDTO>;
}
declare const _default: LicenseManagerAxiosInstance;
export default _default;
