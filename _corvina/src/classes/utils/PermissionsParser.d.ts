import { ParsedData } from '@/interfaces/utils';
export default class PermissionParser {
    static parse(stringPermission: string): ParsedData;
    static parseArray(stringPermissions: string[]): ParsedData[];
}
