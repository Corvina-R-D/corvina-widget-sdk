import AbstractAxiosInstance from "./AbstractAxiosInstance";
import { PageCounterResponseDTO, PageTriggerResponseDTO, TriggerActionsDTO, TriggerCreateRequestDTO, TriggerResponseDTO } from "@/interfaces/trigger";
declare class TriggerAxiosInstance extends AbstractAxiosInstance {
    constructor();
    updateBaseUrl(): void;
    createTrigger(trigger: TriggerCreateRequestDTO): Promise<any>;
    getTriggers(params?: any): Promise<PageTriggerResponseDTO>;
    getTrigger(id: number, params?: any): Promise<TriggerResponseDTO>;
    getBlockedActions(): Promise<TriggerActionsDTO>;
    deleteTrigger(id: number): Promise<any>;
    updateTrigger(id: number, trigger: TriggerCreateRequestDTO): Promise<any>;
    getTriggerCounters(id: string, params: {
        page: number;
        pageSize: number;
        dateFrom: string;
        dateTo: string;
        orderBy: string;
        orderDir: string;
    }): Promise<PageCounterResponseDTO>;
}
declare const _default: TriggerAxiosInstance;
export default _default;
