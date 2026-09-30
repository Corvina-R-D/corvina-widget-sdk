import PaginationQueryParamsDTO from './commons/PaginationQueryParamsDTO';
export interface ApplicationPermissionInDTO {
    id: number;
    name: string;
}
export interface ApplicationPermissionQueryParamsDTO extends PaginationQueryParamsDTO {
    name?: string;
}
