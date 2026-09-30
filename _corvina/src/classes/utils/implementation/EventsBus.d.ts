export interface ECCEvent {
    component: string;
    event: any;
}
declare class ECCEventBus {
    private bus;
    constructor();
    emit(eventname: string, component: string, event: any): void;
    on(eventname: string, callback: (event: ECCEvent) => any): void;
    off(eventname?: string, callback?: (event: ECCEvent) => any): void;
}
export declare const MouseEventBus: ECCEventBus;
export declare const DashboardsEventBus: ECCEventBus;
export declare const AuthorizeTransactionsEventBus: ECCEventBus;
export {};
