import { BaseGraphicWgt } from "@/corvina-model";
export default class LegacyWgt extends BaseGraphicWgt {
    legacyInstance: JM4Web.hmiWidget;
    subtype: string;
    editorEventsEnabled: boolean;
    protected ready: Promise<boolean>;
    protected _ready: (p: boolean) => void;
    constructor(args: any);
    serialize(): import("./BaseGraphicWgt").IBaseGraphicWidgetSerialization;
    private needLegacyProperty;
    private removeDefaultValues;
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    setHeight(height: number): void;
    setWidth(width: number): void;
    setParentBounds(x: any, y: any, width: any, height: any, parentWgt: any): void;
    setLegacyInstance(legacyInstance: any): void;
    updateLegacyDatalinkPermission(): void;
    setInitState(): void;
    protected beforeRemove(): void;
}
