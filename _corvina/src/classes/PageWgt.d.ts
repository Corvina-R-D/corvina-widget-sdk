import { BaseGraphicWgt, BaseWgt } from "@/corvina-model";
import GroupWgt from "./GroupWgt";
export type Bounds = [number, number, number, number];
export default class PageWgt extends BaseGraphicWgt {
    wgts: BaseGraphicWgt[];
    wgtsMap: {};
    wgtsBoundsMap: Map<string, Bounds>;
    requestBoundsUpdate: boolean;
    mainGroup: GroupWgt;
    private scale;
    constructor(args: any);
    mapWidget(widget: BaseWgt, isLoading?: boolean): void;
    mapWidgets(wgts: BaseWgt[], isLoading?: boolean): void;
    getWidget(wgtId: string): any;
    generateGridMatrixRecursive(): void;
    setParentBounds(bounds: any): void;
    getOffsetTop(): number;
    getOffsetLeft(): number;
    getScale(): number;
    setOffsetTop(value: number): void;
    setOffsetLeft(value: number): void;
    setScale(value: number): void;
    getMainGroup(): GroupWgt;
    refresh(): void;
}
