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
/**
 * Requests to open the two panels hanging off the user menu.
 *
 * They used to be opened through `$refs` from inside `UserTopNavBar`, which meant they
 * were reachable only while the topbar was rendered — and `AppLayout` mounts it under a
 * `v-if`, so a route that hides the topbar destroyed them along with it. They are mounted
 * by `AppLayout` now, outside that `v-if`, and both the menu and an embedded app that
 * renders its own menu (corvina-dashboard, whose editor covers this chrome) ask through
 * this bus.
 *
 * `SidePanel` re-parents itself to `$root.$el` on mount, so a panel opened this way is
 * drawn over whatever is on screen, iframe included, and nothing is unmounted to show it.
 */
export declare const UserPanelsEventBus: ECCEventBus;
/** The events `UserPanelsEventBus` carries. */
export declare enum UserPanel {
    PROFILE = "user-profile",
    THEME_CUSTOMIZER = "theme-customizer"
}
export {};
