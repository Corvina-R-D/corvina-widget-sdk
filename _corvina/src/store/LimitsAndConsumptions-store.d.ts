import { ResourceLimit } from "../communication/axios/model/Product";
import { VuexModule } from 'vuex-module-decorators';
import { ConsumptionsFilter } from "@/communication/axios/implementation/LicenseManagerAxiosInstance";
import { ConsumptionEntry, ConsumptionHistory } from "@/interfaces/consumptionsTable";
export default class LimitsAndConsumptionsStore extends VuexModule {
    limits: any[];
    shouldForceUpdate: boolean;
    organizationsConsumptionsTable: {
        pagination: {
            totalElements: number;
            totalPages: number;
        };
    };
    get getLimits(): any[];
    get getShouldForceUpdate(): boolean;
    get getConsumptionsTablePagination(): {
        totalElements: number;
        totalPages: number;
    };
    SET_CONSUMPTIONS_TABLE_PAGE(page: {
        totalElements: number;
        totalPages: number;
    }): void;
    SAVE_ORGANIZATIONS_LIMITS(data: any): void;
    UNSET_FORCE_UPDATE(): void;
    SET_FORCE_UPDATE(): void;
    fetchLimits(orgResourceId: string): Promise<import("../communication/axios/model/Product").ResourceLimitOutDTO[]>;
    fetchCurrentOrganizationLimits(): Promise<import("../communication/axios/model/Product").ResourceLimitOutDTO[]>;
    createLimit(arg: {
        limit: ResourceLimit;
    }): Promise<any>;
    updateLimit(arg: {
        limit: ResourceLimit;
    }): Promise<any>;
    saveLimits(arg: {
        grantingOrganization: string;
        limits: ResourceLimit[];
    }): Promise<any[]>;
    unsetForceUpdate(): void;
    setForceUpdate(): void;
    fetchConsumptionTable(filter: ConsumptionsFilter): Promise<ConsumptionHistory | ConsumptionEntry>;
    fetchConsumptionGraph(filter: ConsumptionsFilter): Promise<ConsumptionHistory>;
}
