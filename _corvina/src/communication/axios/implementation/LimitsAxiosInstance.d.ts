import AbstractAxiosInstance from './AbstractAxiosInstance';
import { ResourceLimit, ResourceLimitOutDTO } from '../model/Product';
declare class LimitsAxiosInstance extends AbstractAxiosInstance {
    constructor();
    fetchLimits(orgResId: string): Promise<ResourceLimitOutDTO[]>;
    createLimits(limits: ResourceLimit | ResourceLimit[]): Promise<any>;
    createLimit(limit: ResourceLimit): Promise<any>;
    updateLimit(limit: ResourceLimit): Promise<any>;
}
declare const _default: LimitsAxiosInstance;
export default _default;
