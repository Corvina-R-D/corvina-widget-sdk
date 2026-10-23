type DataCallback = (value: any) => void;
declare class DeviceMetadataMgr {
    private static instance;
    private devices;
    private websocketConnected;
    private websocketCallback;
    private initialized;
    private markInitialized;
    constructor();
    static getInstance(): DeviceMetadataMgr;
    isInitialized(): Promise<void>;
    subscribe(deviceId: string, tagName: string, callback: DataCallback): void;
    unsubscribe(deviceId: string, tagName: string): void;
    private startWebSocket;
    private fetchMetadata;
    deInitialize(): void;
    closeWebSocket(): void;
}
export default DeviceMetadataMgr;
