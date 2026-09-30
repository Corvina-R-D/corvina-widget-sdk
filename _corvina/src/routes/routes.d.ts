import PermissionAction from '@/constant/PermissionAction';
import PermissionEntity from '@/constant/PermissionEntity';
import { RouteConfig } from 'vue-router';
/**
 * This is a mapping of CorvinaPages to routes.
 * If an app installed in the store, ask to navigate to a CorvinaPage, this mapping will be used to determine the route to navigate to.
 * In this way, we are free to change the route names in the future without breaking the app.
 */
export declare const CorvinaPagesToRoutes: {
    home: string;
    dashboard: string;
    "device-activate": string;
    "device-manage": string;
    "device-vpn": string;
    "data-configure": string;
    "data-explore": string;
    "data-alarms": string;
    "data-notifications": string;
    log: string;
    "iam-organizations": string;
    "iam-users": string;
    "iam-roles": string;
    dealer: string;
    trigger: string;
};
export interface RouteConfigAuth {
    iotOnly?: boolean;
    vpnOnly?: boolean;
    permissions?: [PermissionAction[], PermissionEntity[]][];
}
declare const routes: RouteConfig[];
export default routes;
export declare const routeMap: Map<string, RouteConfig>;
