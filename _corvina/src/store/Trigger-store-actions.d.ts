import { CounterResponseDTO } from "@/interfaces/trigger";
declare const _default: {
    saveTriggers(context: any, presets: any): void;
    fetchTrigger(context: any, params: any): Promise<import("@/interfaces/trigger").PageTriggerResponseDTO>;
    fetchAllTriggerCountersAndCache(context: any, p: {
        id: string;
    }): Promise<CounterResponseDTO[]>;
};
export default _default;
