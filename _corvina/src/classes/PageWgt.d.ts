import { BaseGraphicWgt, BaseWgt } from "@/corvina-model";
import GroupWgt from "./GroupWgt";
export type Bounds = [number, number, number, number];
export default class PageWgt extends BaseGraphicWgt {
    wgts: BaseGraphicWgt[];
    wgtsMap: Record<string, BaseWgt>;
    wgtsBoundsMap: Map<string, Bounds>;
    requestBoundsUpdate: boolean;
    mainGroup: GroupWgt;
    private scale;
    private sizedToContent;
    constructor(args: any);
    mapWidget(widget: BaseWgt, isLoading?: boolean): void;
    mapWidgets(wgts: BaseWgt[], isLoading?: boolean): void;
    clearWidgetMap(): void;
    getWidget(wgtId: string): BaseWgt;
    generateGridMatrixRecursive(): void;
    setParentBounds(bounds: any): void;
    getOffsetTop(): number;
    getOffsetLeft(): number;
    getScale(): number;
    setOffsetTop(value: number): void;
    setOffsetLeft(value: number): void;
    setScale(value: number): void;
    getMainGroup(): GroupWgt;
    scrollEnabled(): boolean;
    /**
     * Content-based sizing of the root grid group (and the page).
     *
     * When the root group has an unbounded auto-size row (it hosts, directly or through
     * nested grid groups, a widget with showAllData, e.g. a DataTable), the root group is grown to its content
     * height so the whole content is laid out without an inner scrollbar; the taller box
     * then overflows the page container, which scrolls (global/page scroll). Both the
     * root group height and this page's height are set to the content height.
     *
     * Otherwise the root group is kept at the viewport height (standard behaviour): if
     * it was sized to content before (e.g. showAllData has just been switched off), it
     * is laid out again at the viewport size, even when it did not actually grow, so the
     * layout engine drops the unbounded rows of the previous pass.
     *
     * The viewport height is taken from boundingRect.height (set only by setParentBounds
     * on the resize path); this.height is grown without touching boundingRect, so the
     * viewport reference stays stable and this method is idempotent.
     */
    resizeToRootContent(): void;
    refresh(): void;
}
