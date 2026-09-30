import AbstractAxiosInstance from "./AbstractAxiosInstance";
declare class AppAxiosInstance extends AbstractAxiosInstance {
    constructor();
    exchangeToken(userToken: string, targetAppKey: string, targetAppOrg: string, serviceAccountUsername: string): Promise<string>;
}
declare const _default: AppAxiosInstance;
export default _default;
