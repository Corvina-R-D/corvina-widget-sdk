export interface PaginatedResponse {
    totalElements: number;
    last: boolean;
    totalPages: number;
    number: number;
}
export interface SortableSubDTO {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}
export interface PageableSubDTO {
    sort: SortableSubDTO;
    pageSize: number;
    pageNumber: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}
export interface PageableFullDTO {
    content: any[];
    pageable: PageableSubDTO;
    totalPages: number;
    totalElements: number;
    last: boolean;
    number: number;
    size: number;
    numberOfElements: number;
    sort: SortableSubDTO;
    first: boolean;
    empty: boolean;
}
