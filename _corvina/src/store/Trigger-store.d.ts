declare const _default: {
    namespaced: boolean;
    state: {
        triggers: {};
        counters: {};
    };
    mutations: {
        SAVE_TRIGGERS(state: any, triggers: any): void;
        SAVE_COUNTERS(state: any, { id, counters }: {
            id: any;
            counters: any;
        }): void;
        INVALIDATE_COUNTERS(state: any, id: any): void;
    };
    actions: {
        saveTriggers(context: any, presets: any): void;
        fetchTrigger(context: any, params: any): Promise<import("../interfaces/trigger").PageTriggerResponseDTO>;
        fetchAllTriggerCountersAndCache(context: any, p: {
            id: string;
        }): Promise<import("../interfaces/trigger").CounterResponseDTO[]>;
    };
    getters: {
        getTriggers(state: any): any;
    };
};
export default _default;
