import 'moment/locale/it';
import './utils/promise-with-resolvers-polyfill';
import { RouteConfig } from 'vue-router';
export { dateTimeFormats, i18n } from "@/i18n-instance";
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';
export declare function initCorvina(setupCorvinaInstance: any): Promise<void>;
export declare function logout(): void;
export declare function hasPermissionToRouteName(route: string): boolean;
export declare function hasPermissionToRoute(route: RouteConfig): boolean;
