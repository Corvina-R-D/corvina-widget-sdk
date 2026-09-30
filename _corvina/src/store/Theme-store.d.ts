declare const _default: {
    namespaced: boolean;
    state: {
        defaultValues: {};
        values: any;
        fetchedLocale: boolean;
    };
    mutations: {
        INIT_STATE(state: any): void;
        SAVE_VALUES(state: any): void;
        RESET_VALUES(state: any): void;
        SET_VALUE(state: any, { name, value }: {
            name: any;
            value: any;
        }): void;
        RESET_VALUE(state: any, name: any): void;
        SET_FETCHED_LOCALE(state: any, bFetched: any): void;
    };
    actions: {
        initState(context: any): Promise<unknown>;
        setValue(context: any, { name, value }: {
            name: any;
            value: any;
        }): void;
        resetValue(context: any, name: any): void;
        saveValues(context: any, orgId: any): Promise<any>;
        saveValuesLocally(context: any): Promise<void>;
        resetValues(context: any): Promise<unknown>;
        fetchTheme(context: any, orgId: any): Promise<any>;
        fetchAnonymousTheme(context: any, host: any): Promise<any>;
        fetchDefaultTheme(context: any, host: any): Promise<any>;
        loadTheme(context: any): Promise<void>;
        setFavicon(context: any, icon: any): Promise<void>;
        calculateCollateralColors(context: any): Promise<void>;
        setFetchedLocale(context: any, bFetchedLocale: any): void;
    };
    getters: {
        defaultValues(state: any): any;
        values(state: any): any;
        menuLogo(state: any): any;
        userManualUrl(state: any): any;
        title(state: any): any;
        getHost(state: any): Promise<string>;
        fetchedLocale(state: any): any;
    };
};
export default _default;
