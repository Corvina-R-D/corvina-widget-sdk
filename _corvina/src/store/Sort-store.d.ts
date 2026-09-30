declare const _default: {
    namespaced: boolean;
    state: {
        sortingKeys: {};
        queryKeys: {};
    };
    getters: {
        getQueryKeys(state: any): (key: any) => any;
        getSortingValues(state: any): (key: any) => any;
    };
    actions: {
        addSortingValues(context: any, data: [{
            key: any;
            value: any;
        }]): void;
        addQueryKeys(context: any, data: [{
            key: any;
            value: any;
        }]): void;
    };
    mutations: {
        SET_QUERY_KEYS(state: any, data: [{
            key: any;
            value: any;
        }]): void;
        SET_SORT_VALUE(state: any, data: [{
            key: any;
            value: any;
        }]): void;
    };
};
export default _default;
