import type { AppOrganizationCreateBodyDTO, AppOrganizationOutDTO, ApplicationOutDTO, AppOrganizationUpgradeBodyDTO } from "@/interfaces/applications";
import { PaymentPlan } from "@/interfaces/applications";
import { VuexModule } from "vuex-module-decorators";
import { RoleInDTO } from "../interfaces/role";
import { CorvinaHost, ITheme } from "@corvina/corvina-app-connect";
export default class AppOrganizationStore extends VuexModule {
    applications: ApplicationOutDTO[];
    /**
     * @internal This property contains both visible and bhidden apps and should not be used directly.
     * Use getAppOrganizations or getHiddenAppOrganizations getters instead.
     */
    appOrganizations: AppOrganizationOutDTO[];
    appIframes: Map<string, Set<string>>;
    appTokens: Map<string, string>;
    corvinaHost: CorvinaHost | null;
    planToPurchase: PaymentPlan | null;
    get getAppIframes(): Map<string, Set<string>>;
    get getCorvinaHost(): CorvinaHost | null;
    setCorvinaHost(corvinaHost: CorvinaHost): void;
    setPlanToPurchase(plan: PaymentPlan | null): void;
    cachedTranslationUris: Record<string, string>;
    get getApplications(): ApplicationOutDTO[];
    get getHiddenApplications(): ApplicationOutDTO[];
    get getWidgetApplications(): ApplicationOutDTO[];
    get getAllVisibleApplications(): ApplicationOutDTO[];
    get getAllApplications(): ApplicationOutDTO[];
    get getAppOrganizations(): AppOrganizationOutDTO[];
    get getInvisibleAppOrganizations(): AppOrganizationOutDTO[];
    get getHiddenAppOrganizationsKeys(): string[];
    get getWidgetAppOrganizations(): AppOrganizationOutDTO[];
    get getActiveWidgetAppOrganizations(): AppOrganizationOutDTO[];
    get getAllVisibleAppOrganizations(): AppOrganizationOutDTO[];
    get getInstalledApp(): AppOrganizationOutDTO[];
    fetchAllApplications(): Promise<void>;
    setApplications(applications: ApplicationOutDTO[]): void;
    setAppOrganizations(appOrganizations: AppOrganizationOutDTO[]): void;
    addAppOrganization(appOrganization: AppOrganizationOutDTO): void;
    updateAppOrganization(appOrganization: AppOrganizationOutDTO): void;
    deleteAppOrganization(appOrganization: AppOrganizationOutDTO): void;
    clearAppOrganizations(): void;
    removeAppIframe({ appId, iframeOrigin }: {
        appId: string;
        iframeOrigin: string;
    }): void;
    addAppIframe({ app, iframeOrigin: iframeOrigin }: {
        app: AppOrganizationOutDTO;
        iframeOrigin: string;
    }): Promise<void>;
    refreshAppsToken(): Promise<void>;
    fetchAppOrganizations(): Promise<AppOrganizationOutDTO[]>;
    fetchAppOrganizationsByOrgId(orgId: number): Promise<AppOrganizationOutDTO[]>;
    createAppOrganization(appOrganization: AppOrganizationCreateBodyDTO): Promise<AppOrganizationOutDTO>;
    upgradeAppOrganization({ appOrganization, appOrganizationUpgradeBodyDTO, }: {
        appOrganization: AppOrganizationOutDTO;
        appOrganizationUpgradeBodyDTO: AppOrganizationUpgradeBodyDTO;
    }): Promise<AppOrganizationOutDTO>;
    getAppTranslationUrl(appId: number): Promise<string | undefined>;
    fetchRoleToEnableAppOrganization(appOrganization: AppOrganizationOutDTO): Promise<RoleInDTO>;
    fetchRolesToEnableAppOrganization(appOrganization: AppOrganizationOutDTO): Promise<RoleInDTO[]>;
    fetchUserToEnableAppDeviceAccess(appOrganization: AppOrganizationOutDTO): Promise<RoleInDTO>;
    fetchUsersToEnableAppDeviceAccess(appOrganization: AppOrganizationOutDTO): Promise<RoleInDTO[]>;
    getOrCreateCorvinaHost(): Promise<CorvinaHost>;
    recomputeDependenciesToInstall(params: {
        app: ApplicationOutDTO;
        includeHiddenApps: boolean;
    }): string[];
}
export declare function mapFrontendThemeToCorvinaConnectTheme(theme: any): ITheme;
