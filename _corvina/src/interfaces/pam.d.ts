import { PaginationRestDTO } from "./commons/pagination";
export declare enum GrantEntitlement {
    ADMIN_SELF_SERVICE = "ADMIN_SELF_SERVICE"
}
export declare enum GrantStatus {
    ACTIVE = "ACTIVE",
    ENDED = "ENDED",
    REVOKED = "REVOKED"
}
export declare const PAM_MAX_DURATION_MINUTES = 480;
export interface GrantCreateDTO {
    description: string;
    durationMinutes: number;
}
export interface Grant {
    id: number;
    requester: string;
    orgResourceId: string;
    description: string;
    entitlement: GrantEntitlement;
    durationMinutes: number;
    startTime: string;
    endTime: string;
    revokedAt: string | null;
    revokedBy: string | null;
    status: GrantStatus;
}
export interface GrantsPageDTO extends PaginationRestDTO<Grant> {
}
