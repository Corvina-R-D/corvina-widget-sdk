interface FrameState {
    topbar: boolean;
    topbarSize: {
        height: number;
    };
    panels: Array<Panel>;
    path: string;
    loading: boolean;
    portalMenu: {
        status: "open" | "closed";
    };
}
type PanelType = "overlay" | "docked";
type DockLocation = "left" | "";
interface Panel {
    ref: string;
    type: PanelType;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: string;
        height: string;
    };
    dock: {
        location: DockLocation;
    };
}
declare const _default: {
    namespaced: boolean;
    state: () => FrameState;
    mutations: {
        TOGGLE_PORTAL_MENU(state: FrameState, panel: Panel): void;
        SHOW_TOPBAR(state: FrameState): void;
        HIDE_TOPBAR(state: FrameState): void;
        SET_CURRENT_ROUTE(state: FrameState, path: string): void;
        SET_LOADING_STATUS(state: FrameState, status: boolean): void;
        ADD_PANEL(state: FrameState, panel: Panel): void;
        REMOVE_PANEL(state: FrameState, panel: {
            ref: string;
        }): void;
        UPDATE_PANEL(state: FrameState, panel: Panel): void;
    };
    actions: {
        showTopbar(context: any): void;
        hideTopbar(context: any): void;
        setCurrentRoute(context: any, { route }: {
            route: any;
        }): void;
        showLoader(context: any): void;
        hideLoader(context: any): void;
    };
    getters: {
        topbarVisible(state: FrameState): boolean;
        route(state: FrameState): string;
        loading(state: FrameState): boolean;
        panels(state: FrameState): Panel[];
        topBarHeight(state: FrameState): number;
        portalMenuStatus(state: FrameState): "open" | "closed";
    };
};
export default _default;
