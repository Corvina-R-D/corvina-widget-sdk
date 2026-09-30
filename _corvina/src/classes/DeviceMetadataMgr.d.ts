type DataCallback = (value: any) => void;
declare class DeviceMetadataMgr {
    private static instance;
    private devices;
    private websocketConnected;
    private websocketCallback;
    constructor();
    static getInstance(): DeviceMetadataMgr;
    subscribe(deviceId: string, tagName: string, callback: DataCallback): void;
    unsubscribe(deviceId: string, tagName: string): void;
    private startWebSocket;
    private fetchMetadata;
    closeWebSocket(): void;
}
export default DeviceMetadataMgr;
