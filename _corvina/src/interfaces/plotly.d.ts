import { PlotData } from 'plotly.js';
export interface IChartData extends Partial<PlotData> {
    uid: string;
    name: string;
    _lastValue?: undefined;
    _labelId?: string;
    /** Marks a synthetic "fill line to now" trace created by PlotlyDataAdapter, to be excluded from export. */
    _isFillLineToNowTrace?: boolean;
    /** On a real (non-synthetic) trace: its "fill line to now" traces, so the view layer can mirror legend visibility onto them. */
    _fillLineToNowTraces?: IChartData[];
    offsetgroup?: string | number;
    base?: number[] | number;
}
export declare enum LineStyle {
    SOLID = "solid",
    DOT = "dot",
    DASH = "dash",
    LONGDASH = "longdash",
    DASHDOT = "dashdot",
    LONGDASHDOR = "longdashdot"
}
export declare enum LineShape {
    LINEAR = "linear",
    SPLINE = "spline",
    HV = "hv",
    VH = "vh"
}
