import { VuexModule } from "vuex-module-decorators";
export default class UserGroupMembershipsStore extends VuexModule {
    private memberships;
    get hasSomeAdmin(): boolean;
    get isAdminOf(): (id: number) => boolean;
    get userOf(): number[];
    get canManage(): (id: number) => boolean;
    private setMemberships;
    refresh(): Promise<void>;
}
