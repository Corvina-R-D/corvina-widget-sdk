interface Notifier {
    cb: (value: Object, timestamp?: any) => any;
    updateCallback: (cb: (Object: any) => any) => void;
    size(): number;
}
export declare class WSDataChannel {
    private static triggersRefCount;
    private static socket;
    private static platformToken;
    private static _initializeWebSocket;
    private static orgId;
    private static retryTimer;
    private static pingTimeout;
    private static pingInterval;
    private static fatalErrorCallback;
    static onFatalError(callback: (fatalError: {
        code: number;
        message: string;
    }) => void): void;
    static reset(): void;
    static initializeWebSocket(organizationId: number): Promise<void>;
    static _init(organizationId: number): Promise<unknown>;
    static reopen(): Promise<void>;
    static open(organizationId: number, deviceId: string, modelPath: string, cb: Notifier): Promise<void>;
    /**
     * @returns true if the channel has no more triggers, false otherwise
     */
    static close(deviceId: string, modelPath: string, cb: Notifier): Promise<boolean>;
    private static triggerId;
    private static id;
    private static deviceIdModelPathFromTriggerId;
}
export declare class WSTagChannel implements Notifier {
    constructor(organizationId: number, modelPath: string, deviceId: string, cb: (Object: any, timestamp?: string) => any);
    open(): Promise<void>;
    close(): Promise<boolean>;
    updateCallback(cb: (Object: any) => any): void;
    size(): number;
    addSlotTagName(name: any): void;
    removeSlotTagName(name: any): void;
    containsSlotTagName(name: any): boolean;
    getSlotTags(): string[];
    hasSlotTag(): boolean;
    cb: (Object: any) => void;
    modelPath: string;
    deviceId: string;
    organizationId: number;
    slotTagNames: Set<string>;
}
export {};
