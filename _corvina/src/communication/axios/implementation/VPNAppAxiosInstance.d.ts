import { AxiosRequestConfig } from 'axios';
import { VPNAppState } from '@/store/VPNApp-store';
export interface VPNAppInfo {
    networkError?: boolean;
    protocolName: string;
    libVersion: string;
    productVersion: string;
    hostname: string;
    port: number;
}
export interface VPNAppConnectionStatus {
    state: VPNAppState;
    error?: {
        code: number;
        desc: string;
        seq: number;
    };
    conn?: {
        gateway_ip: string;
        ip: string;
        start_time: number;
    };
    login?: {
        user: string;
    };
    progress?: {
        desc: string;
        step: number;
        total: number;
    };
}
declare class VPNAppAxiosInstance {
    private axiosInstance;
    constructor();
    setHostnameAndPort(hostname: string, port: number): void;
    testServiceIsRunning(hostname: string, port: number): Promise<any>;
    getConfigApp(): Promise<any>;
    setConfigApp(data: any): Promise<unknown>;
    authWithApp({ id, url, type, user, pass }: {
        id?: string;
        type?: string;
        url: string;
        user: string;
        pass: string;
    }): Promise<unknown>;
    doAction(params: Record<string, string>): Promise<any>;
    doStartAction(forceLogout: boolean): Promise<any>;
    doStopAction(): Promise<any>;
    doSyncRoutes(ips: string[]): Promise<any>;
    doExecCommand({ name, remark, endpointName, path, args }: {
        name: string;
        remark: string;
        endpointName: string;
        path: string;
        args: string;
    }): Promise<void>;
    getInfo(): Promise<VPNAppInfo>;
    getStatus(): Promise<VPNAppConnectionStatus>;
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}
declare const _default: VPNAppAxiosInstance;
export default _default;
