import AbstractAxiosInstance from "./AbstractAxiosInstance";
import { Grant, GrantCreateDTO, GrantStatus, GrantsPageDTO } from "@/interfaces/pam";
declare class PamAxiosInstance extends AbstractAxiosInstance {
    constructor();
    updateBaseUrl(): void;
    createGrant(organizationId: string, grant: GrantCreateDTO): Promise<Grant>;
    getGrants(organizationId: string, params: {
        requester?: string;
        status?: GrantStatus;
        page: number;
        pageSize: number;
    }): Promise<GrantsPageDTO>;
    revokeGrant(organizationId: string, grantId: number): Promise<Grant>;
}
declare const _default: PamAxiosInstance;
export default _default;
