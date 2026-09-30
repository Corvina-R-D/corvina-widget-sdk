import AbstractAxiosInstance from "./AbstractAxiosInstance";
declare class ThemeAxiosInstance extends AbstractAxiosInstance {
    constructor();
    updateBaseUrl(): void;
    getTheme(organizationId: any): Promise<any>;
    getThemes(host: any): Promise<any>;
    saveTheme(organizationId: any, theme: any): Promise<any>;
}
declare const _default: ThemeAxiosInstance;
export default _default;
