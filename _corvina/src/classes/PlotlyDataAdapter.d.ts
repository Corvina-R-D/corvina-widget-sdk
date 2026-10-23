import DataAdapter from "./DataAdapter";
import { IChartData } from "@/interfaces/plotly";
import { BaseObject } from "src/interfaces/Widgets";
import { PlotType } from "plotly.js";
export default class PlotlyDataAdapter<DataSerie extends BaseObject> extends DataAdapter<DataSerie, IChartData> {
    private _prevInStackGroupMap;
    private _prevFillMap;
    private _prevDatasetTypeMap;
    private _fillLineToNowMap;
    private _requireFullRedraw;
    removeSerie(source: DataSerie): void;
    clearData(): void;
    protected fillChartData(series: DataSerie, data: IChartData, style?: any): void;
    /**
     * Computes the [lastTimestamp, fillUpTo] extension for a "fill line to now" trace, or
     * null when the option doesn't apply. "Now" is the real wall-clock time, not the chart's
     * endDate: endDate tracks wherever the user has panned/zoomed to, so anchoring to it would
     * make the marker drift away from "today" as soon as the view is dragged. Panning still
     * moves the marker on screen (it triggers a data refresh, which recomputes this against
     * the then-current wall clock) — but it always lands back on the real current instant,
     * never on the edge of whatever range happens to be visible.
     */
    private computeFillLineToNowExtension;
    private newFillLineToNowTrace;
    /**
     * Maintains, per series with the option enabled, a continuation trace kept apart from the
     * main one — same style as the real data, so it reads as a plain continuation rather than
     * an extrapolation — from the last recorded value up to now. Kept separate so it can be
     * excluded wholesale from data export, and hidden independently of the main trace
     * (whenever the real line itself is hidden via lineDisplayLines, since there is then no
     * line to continue).
     */
    private applyFillLineToNow;
    /**
     * Consume and return whether a full redraw is required.
     * The flag is cleared when consumed.
     */
    consumeRequireFullRedraw(): boolean;
    hasTraceType(type: PlotType): boolean;
    protected getDataTemplate(): IChartData;
    private isGLCompatible;
    private extractStyle;
}
