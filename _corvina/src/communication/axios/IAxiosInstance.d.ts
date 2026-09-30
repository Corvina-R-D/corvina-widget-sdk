import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ReplyRequestParams } from './model/ReplyRequestParams';
export default interface IAxiosInstance {
    getAxiosInstance(): AxiosInstance;
    ejectRequestInterceptor(key: number): void;
    setRequestInterceptor(headers: any): number;
    setResponseInterceptor(i: (res: AxiosResponse) => any): number;
    ejectResponseInterceptor(key: number): void;
    replayRequest(params: ReplyRequestParams): void;
    setBaseUrl(baseURL: string): void;
    updateBaseUrl(): void;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete(url: string, config?: AxiosRequestConfig): Promise<any>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}
