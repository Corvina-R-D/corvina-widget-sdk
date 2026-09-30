import { AxiosRequestConfig, AxiosResponse } from 'axios';
export declare class ReplyRequestParams {
    initialRequest: AxiosRequestConfig;
    resolve: (r: AxiosResponse<any>) => any;
    reject: (r: any) => any;
}
