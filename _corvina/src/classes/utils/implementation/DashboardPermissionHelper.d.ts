import { DashboardItemInDTO, IDashboardItem } from "@/interfaces/dashboard";
import { UserGroupName } from "@/interfaces/userGroup";
export default class DashboardPermissionHelper {
    static isSharableByUser(user: string, dashboard: DashboardItemInDTO, selectedOrgResourceId: string): boolean;
    static isSharableByGroups(userGroups: UserGroupName[], dashboard: DashboardItemInDTO, selectedOrgResourceId: string): boolean;
    static isSharedWithGroup(userGroups: UserGroupName[], dashboard: DashboardItemInDTO, orgResourceId?: string): boolean;
    static isSharedWithUser(username: string, dashboard: DashboardItemInDTO, orgResourceId?: string): boolean;
    static isGroupReader(userGroups: UserGroupName[], dashboard: DashboardItemInDTO): boolean;
    static isGroupEditor(userGroups: UserGroupName[], dashboard: DashboardItemInDTO): boolean;
    static isGroupDistributor(userGroups: UserGroupName[], dashboard: DashboardItemInDTO): boolean;
    static isSharedWithMe(username: string, dashboard: DashboardItemInDTO, orgResourceId?: string): boolean;
    static isReader(username: any, dashboard: any): boolean;
    static isEditor(username: any, dashboard: any): boolean;
    static isDistributor(username: any, dashboard: any): boolean;
    static formatUserGroupFullName(organization: string, name: string): string;
    static getRelativeUserGroupFullName(organization: string, fullName: string): string;
    static cannotShareDashboard(dashboard: DashboardItemInDTO, username: string, groupsMembership: UserGroupName[], orgResourceId: string): boolean;
    static cannotAccessDashboard(dashboard: DashboardItemInDTO, username: string, groupsMembership: UserGroupName[], orgResourceId: string): boolean;
    static setItemProperties(dtoIn: any, username: string): IDashboardItem;
}
