import { BaseWgt } from "@/corvina-model";
declare class EventManager {
    actions: {
        LoadDashboard: string;
        GoToUrl: string;
        ParametricAction: string;
        SetTag: string;
        LaunchVPNApp: string;
    };
    events: {
        onMouseClick: string;
        onPropertyUpdate: string;
    };
    private watcher;
    private watchers;
    constructor();
    addEvent(eventName: string, wgt: BaseWgt): void;
    watchOnPropertyUpdate(wgt: BaseWgt): void;
    removeWatchers(): void;
    hasEvent(wgt: BaseWgt, eventName: string): boolean;
    trigger(event: string, wgt: BaseWgt, data?: any): boolean;
    canAddEvent(eventName: string, wgt: BaseWgt): boolean;
}
declare const _default: EventManager;
export default _default;
