import { PageableSubDTO } from "@/communication/axios/model/generic";
import { PaginationDTO } from "./commons/pagination";
import { ProductResourceType } from "@/communication/axios/model/Product";
export interface CreditsTransaction {
    id?: number;
    targetWalletId?: string;
    amount?: number;
    createdAt?: string;
    authorizedBy?: string;
    issuedBy?: string;
    description?: string;
    transactionSubjectType?: string;
    transactionSubjectRef?: string;
    transactionSubjectQuantity?: number;
    transactionData?: {
        [key: string]: unknown;
    };
}
export interface ConsumptionEntry {
    device?: {
        alias: string;
        id: number;
        label: string;
        logicalId: string;
        orgResourceId?: string;
        serialNumber: string;
    };
    id?: number;
    numOfSeconds?: number;
    timestamp: string | number;
    usage?: number;
    used?: number;
    granted?: number;
    grantedUsed?: number;
    licensed?: number;
    quantity?: number;
    organization?: string;
    grantingOrganization?: string;
    dealerOrganization?: string;
    licenseCode?: string;
    creditsTransaction?: CreditsTransaction;
    resourceType: ProductResourceType;
}
export interface ConsumptionsTable extends PaginationDTO {
    content: ConsumptionEntry[];
    empty: Boolean;
    pageable: PageableSubDTO;
}
export interface ConsumptionHistory extends PaginationDTO {
    content?: ConsumptionEntry[];
    empty?: Boolean;
    pageable?: PageableSubDTO;
    usage?: number;
}
