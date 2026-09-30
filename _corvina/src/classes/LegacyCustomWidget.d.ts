import { BaseGraphicWgt, Value } from '@/corvina-model';
declare enum SCALING {
    NONE = -1,
    SCALE = 0,
    STRETCH = 1
}
export default class LegacyCustomWidget extends BaseGraphicWgt {
    private legacyInstance;
    private legacyPropsMap;
    customScaling: SCALING;
    props: {
        [name: string]: Value<any>;
    };
    constructor(args: any);
    setInitState(): any;
    setLegacyInstance(instance: any): void;
    private initializeProperties;
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    getPropertyValue(prop: string): any;
    setHeight(height: number): void;
    setWidth(width: number): void;
    setParentBounds(x: number, y: number, width: number, height: number, parentWgt: BaseGraphicWgt): void;
    updateInstanceBound(): void;
    addWidget(widget: any): void;
    isModuleInstance(): boolean;
    getJMType(): string;
    serialize(): import("./BaseGraphicWgt").IBaseGraphicWidgetSerialization;
    protected beforeRemove(): void;
    onActivate(): void;
    private _activate;
    onDeactivate(): void;
    private _deactivate;
}
export {};
