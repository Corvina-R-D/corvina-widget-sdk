import { PlotData } from 'plotly.js';
export interface IChartData extends Partial<PlotData> {
    uid: string;
    name: string;
    _lastValue?: undefined;
    _labelId?: string;
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
