import BaseGraphicWgt from "@/classes/BaseGraphicWgt";
import BaseWgt from "@/classes/BaseWgt";
export declare class WidgetSelectionMode {
    name: string;
    selectWidget(evt: any, wgt: any, component: any): void;
    deselectWidget(component: any): void;
    drop(evt: any, wgt: any, sourceElement: any | BaseWgt, customType?: string, parsedDataJSON?: any): Promise<void>;
    move(source: BaseGraphicWgt, target: BaseGraphicWgt, component: any): Promise<void>;
    dragover(evt: any, wgt: any, component: any): any;
    clearHighlightSelector(component: any): void;
}
declare const _default: WidgetSelectionMode;
export default _default;
