import { BaseGraphicWgt, BaseWgt, GroupWgt } from "@/corvina-model";
import { LayoutType } from "@/constant/Layouts";
export default class AbsoluteLayoutWgt extends GroupWgt {
    xformScaling: boolean;
    constructor(args: any);
    getLayoutType(): LayoutType;
    private _triggerParentLayoutAlgorithm;
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    setLayoutProp(prop: string, value: any, applyAlgorithm?: boolean, size?: number): void;
    getPropertyError(propName: string): string | null;
    addChild(child: BaseWgt): boolean;
    /**
     * Adapts a widget just added by the user (e.g. dropped from the gallery): with xformScaling, a widget larger
     * than 1/2.5 of the layout is scaled down. Not applied in addChild, so pasted or restored widgets keep their bounds.
     */
    fitNewChild(child: BaseGraphicWgt): void;
    serialize(): import("./BaseGraphicWgt").IBaseGraphicWidgetSerialization;
}
