declare class KeyboardShortcutsMgr {
    static instance: KeyboardShortcutsMgr;
    projectStore: any;
    constructor();
    handleShortcut(event: KeyboardEvent): Promise<void>;
    private identifyContext;
    private isDashboardEditorOpen;
    private noComponentSelected;
    private checkShortcut;
    private handleDashboardKeyDown;
    private copy;
    private handleFrameKeyDown;
    private paste;
    static getInstance(): KeyboardShortcutsMgr;
}
export default KeyboardShortcutsMgr;
