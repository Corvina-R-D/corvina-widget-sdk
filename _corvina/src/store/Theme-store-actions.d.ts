declare const _default: {
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
export default _default;
