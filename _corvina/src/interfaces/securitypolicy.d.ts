import DeviceGroupType from '@/constant/DeviceGroupType';
import PaginationQueryParamsDTO from './commons/PaginationQueryParamsDTO';
export interface SecurityPolicyInDTO {
    id: number;
    name: string;
    type: DeviceGroupType;
}
export interface SecurityPolicyOutDTO {
    name: string;
}
export interface SecurityPolicyQueryParamsDTO extends PaginationQueryParamsDTO {
    name?: string;
    roleId?: string;
    deviceId?: string;
    type?: DeviceGroupType;
}
