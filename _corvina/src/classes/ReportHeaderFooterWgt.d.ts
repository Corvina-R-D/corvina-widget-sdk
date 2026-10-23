import { AbsoluteLayoutWgt } from "@/corvina-model";
export default class ReportHeaderFooterWgt extends AbsoluteLayoutWgt {
    static HEADER_FOOTER_ALLOWED_CHILDREN: string[];
    private reportHeaderFooter;
    private _lastSyncedRole;
    constructor(args: any);
    setParentBounds(x: any, y: any, width: any, height: any, parentWgt?: any): void;
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    private _syncHeightToStore;
    onChildRemoved(): void;
    getPropertyError(propName: string): string | null;
    supportChildType(classWgt: string): boolean;
    supportDropTag(): boolean;
    serialize(): import("./BaseGraphicWgt").IBaseGraphicWidgetSerialization;
    getCustomCSSClasses(): string[];
}
