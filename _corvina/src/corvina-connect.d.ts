/**
 * Here the references to the classes necessary to login and communicate to corvina cloud.
 */
export { initCorvina } from "./main";
export { setCommunicationSettings } from "./communication/CommunicationInitializer";
export { default as DeviceMappingAxiosInstance } from "./communication/axios/implementation/DeviceMappingAxiosInstance";
export { default as CorvinaCoreAxiosInstance } from "./communication/axios/implementation/CorvinaCoreAxiosInstance";
export { default as LicenseManagerAxiosInstance } from "./communication/axios/implementation/LicenseManagerAxiosInstance";
export { default as AlarmsAxiosInstance } from "./communication/axios/implementation/AlarmsAxiosInstance";
export { default as LimitsAxiosInstance } from "./communication/axios/implementation/LimitsAxiosInstance";
export { default as ProductsAxiosInstance } from "./communication/axios/implementation/ProductsAxiosInstance";
export { default as NotificationAxiosInstance } from "./communication/axios/implementation/NotificationAxiosInstance";
export { default as CorvinaPlatformControllerInstance } from "./communication/axios/implementation/CorvinaPlatformControllerInstance";
export { default as ThemeAxiosInstance } from "./communication/axios/implementation/ThemeAxiosInstance";
export { default as VPNAxiosInstance } from './communication/axios/implementation/VPNAxiosInstance';
export { default as DashboardAxiosInstance } from "./communication/axios/implementation/DashboardAxiosInstance";
export { default as CommunicationSettings } from "./communication/CommunicationSettings";
