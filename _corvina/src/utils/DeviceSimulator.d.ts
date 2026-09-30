type DataCallback = (tagName: string, value: number, ts: number) => void;
declare class DeviceSimulator {
    private static instance;
    private devices;
    private constructor();
    static getInstance(): DeviceSimulator;
    subscribe(deviceId: string, tagName: string, type: string, callback: DataCallback, configuration?: any): void;
    setTagSimulation(deviceId: string, tagName: string, description: any): void;
    unsubscribe(deviceId: string, tagName: string): void;
    readHistoricalData(deviceId: string, tagName: string, from: number, to: number): Array<{
        ts: number;
        v: any;
    }>;
}
export default DeviceSimulator;
