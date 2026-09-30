export declare namespace StoreLoader {
    function loadPermissionStores(): Promise<void>;
    function loadVPNStores(): Promise<void>;
    function loadThemeStores(): Promise<void>;
    function loadFrameStores(): Promise<void>;
    function loadDeviceStores(): Promise<void>;
    function loadNotificationStores(): Promise<void>;
    function loadAuditStores(): Promise<void>;
    function loadBaseUIStores(): Promise<void>;
    function loadAppOrganizationStores(): Promise<void>;
    const loadDashboardsStores: () => Promise<any>;
    const loadTriggerStores: () => Promise<any>;
    function loadAllStores(): Promise<void>;
}
