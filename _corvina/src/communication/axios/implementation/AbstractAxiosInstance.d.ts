import { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import IAxiosInstance from '../IAxiosInstance';
import { ReplyRequestParams } from '../model/ReplyRequestParams';
export default abstract class AbstractAxiosInstance implements IAxiosInstance {
    private axiosInstance;
    getAxiosInstance(): AxiosInstance;
    ejectRequestInterceptor(key: number): void;
    setRequestInterceptor(onFulfilled?: (value: InternalAxiosRequestConfig<any>) => InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>>, onRejected?: (error: any) => any): number;
    setResponseInterceptor(i: (res: AxiosResponse) => any): number;
    setTokenAuthenticationInterceptor(): void;
    ejectResponseInterceptor(key: number): void;
    replayRequest(params: ReplyRequestParams): void;
    setBaseUrl(baseURL: string): void;
    updateBaseUrl(): void;
    getBaseUrl(): string;
    delete(url: string, config?: AxiosRequestConfig): Promise<any>;
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}
