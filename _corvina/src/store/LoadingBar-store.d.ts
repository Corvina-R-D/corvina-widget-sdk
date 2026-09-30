export interface LoadingActivity {
    id: string;
    totSteps?: number;
    doneSteps?: number;
    indeterminate?: boolean;
}
declare const _default: {
    namespaced: boolean;
    state: {
        totSteps: number;
        doneSteps: number;
        registeredLoadings: Map<String, LoadingActivity>;
        indeterminates: number;
    };
    getters: {
        totSteps(state: any): any;
        doneSteps(state: any): any;
        indeterminates(state: any): any;
    };
    mutations: {
        PROGRESS(state: any, data: LoadingActivity): void;
    };
};
export default _default;
