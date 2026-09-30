export declare class WSQueue {
    constructor();
    /** Main callback */
    notify(payload: any): void;
    add(cb: (d: any) => void): void;
    remove(cb: (d: any) => void): void;
    length(): number;
    cbs: Array<(d: any) => void>;
}
export declare class WSUpdate {
    private static triggersRefCount;
    private static socket;
    private static _initializeWebSocket;
    private static pingTimeout;
    private static timeoutId;
    private static reconnectionTimeoutId;
    static successCallback: Function;
    static errorCallback: Function;
    static currentOrgResourceId: string;
    static reset(): void;
    static switchOrganization(orgResourceId: string): void;
    static initializeWebSocket(orgResourceId: string): Promise<void>;
    static _init(orgResourceId: string): Promise<unknown>;
    private static retry;
    static open(orgResourceId: string, callback: {
        type: string;
        cb: (Object: any) => void;
    }): Promise<void>;
    static close(callback?: {
        type: string;
        cb: (Object: any) => void;
    }): Promise<void>;
}
