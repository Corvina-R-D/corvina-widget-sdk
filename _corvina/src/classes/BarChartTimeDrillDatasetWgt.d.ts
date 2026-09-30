import { TIMERESOLUTION } from "@/utils/aggregation/Aggreagator";
import { BaseWgt } from "../corvina-model";
import TrendDataWgt from "./TrendDataWgt";
import TrendDatasetWgt from "./TrendDatasetWgt";
export default class BarChartTimeDrillDatasetWgt extends TrendDatasetWgt {
    aggregation: string;
    aggrSumTimeValue: number;
    aggrSumTimeUnit: string;
    aggrDeltaCounterMaxValue: number;
    aggrDeltaCounterNullAsZero: boolean;
    aggrDeltaSkipFalsePositiveOverflow: number;
    aggrDeltaCounterMode: "reset" | "overflow";
    aggrDeltaCounterOscillationThreshold: number;
    aggrDeltaCounterRange: {
        min: number;
        max: number;
    };
    aggrCountSkipNull: boolean;
    aggrAverageSkipNull: boolean;
    filterBeforeAlignment: string;
    resolution: TIMERESOLUTION;
    constructor(args: any);
    private getAggregationOperatorParams;
    updateDataResolution(): void;
    stopRefreshData(): void;
    startRefreshData(): void;
    protected calculateAggregationParameters(resolution: TIMERESOLUTION): {
        type: string;
        sampling: {
            extent: number;
            size: number;
            unit: import("@/utils/aggregation/Aggreagator").SizeUnit;
            offset: number;
        };
    };
    protected addTrendData(state: any): TrendDataWgt;
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    getPropertyValue(prop: string): any;
    removeChild(childIndex: number): BaseWgt;
    serialize(): any;
}
