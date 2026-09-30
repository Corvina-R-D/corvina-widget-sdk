import { OrganizationLoginInfoDTO } from '../interfaces/organization.js';
import Keycloak, { KeycloakInitOptions } from 'keycloak-js';
export declare enum KeycloakLoginActions {
    CONFIGURE_TOTP = "CONFIGURE_TOTP",
    UPDATE_PASSWORD = "UPDATE_PASSWORD"
}
export default class CommunicationSettings {
    static baseHostnameCache: string;
    static realmCache: string;
    static corvinaAccountsRealmCache: string;
    private static organizationCache;
    static i18nHost: string;
    static $keycloak: Keycloak;
    static $keycloakAccount: Keycloak;
    static readonly WS_SUBPROTOCOL_BEARER_PREFIX: string;
    static realm(): Promise<string>;
    static corvinaAccountsRealm(): string;
    static getLoginInfo(organizationHostname: string): Promise<OrganizationLoginInfoDTO>;
    static organization(): string;
    static baseHostname(): string;
    static orgHostname(): string;
    static themeApiUrl(): string;
    static licensesApiUrl(): string;
    static limitsApiUrl(): string;
    static alarmsApiUrl(): string;
    static notificationApiUrl(): string;
    static authApiUrl(): string;
    static licenseManagerApiUrl(): string;
    static deviceMappingApiUrl(): string;
    static dashboardApiUrl(): string;
    static corvinaCoreApiUrl(): string;
    static platformControllerUrl(): string;
    static wsPlatformControllerUrl(): string;
    static keycloak(initOptions?: KeycloakInitOptions): Promise<Keycloak>;
    static vpnProxyApiUrl(): string;
    static corvinaVpnProxyApiUrl(): string;
    static auditApiUrl(): string;
    static triggerApiUrl(): string;
    static doLoginAction(keycloakLoginAction: KeycloakLoginActions): Promise<void>;
}
