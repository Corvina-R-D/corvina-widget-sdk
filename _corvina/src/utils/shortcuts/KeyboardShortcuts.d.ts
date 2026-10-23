declare class KeyboardShortcutsMgr {
    static instance: KeyboardShortcutsMgr;
    projectStore: any;
    private shortcutsConfig;
    private pendingMousePosition;
    private rafId;
    private mouseMoveHandler;
    constructor();
    /**
     * Start tracking mouse position (should be called when the dashboard editor becomes active).
     * Uses requestAnimationFrame to throttle Vuex commits to at most once per frame.
     */
    startMouseTracking(): void;
    /**
     * Stop tracking mouse position (should be called when leaving the dashboard editor).
     */
    stopMouseTracking(): void;
    handleShortcut(event: KeyboardEvent): Promise<void>;
    private identifyContext;
    private isDashboardEditorOpen;
    private isDashboardListOpen;
    private noComponentSelected;
    private parseShortcutsConfiguration;
    private checkShortcut;
    private handleDashboardKeyDown;
    private copy;
    private handleDashboardListKeyDown;
    private handleFrameKeyDown;
    private paste;
    static getInstance(): KeyboardShortcutsMgr;
}
export default KeyboardShortcutsMgr;
