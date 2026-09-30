import PaginationQueryParamsDTO from './commons/PaginationQueryParamsDTO';
export interface ModelPathInDTO {
    id: number;
    mode: string;
    path: string;
    pathRegExp: string;
}
export interface ModelPathOutDTO {
    path: string;
    pathRegExp: string;
    realm: string;
}
export interface ModelPathQueryParamsDTO extends PaginationQueryParamsDTO {
}
