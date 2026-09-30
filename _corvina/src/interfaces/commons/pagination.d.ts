export interface PaginationDTO {
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    size: number;
    sort: {};
    totalElements: number;
    totalPages: number;
}
export interface PaginationRestDTO<T> extends PaginationDTO {
    content: T[];
}
