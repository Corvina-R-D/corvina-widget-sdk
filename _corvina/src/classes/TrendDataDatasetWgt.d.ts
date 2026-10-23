import BaseWgt from "./BaseWgt";
import { Value } from "@/corvina-model";
import TrendDataWgt from "./TrendDataWgt";
declare abstract class TrendDataDatasetWgt extends BaseWgt {
    startDate: Value<Date>;
    endDate: Value<Date>;
    abstract getSampling(): {
        enabled: boolean;
        aggregation: string;
        size: number;
        extent: number;
        unit: string;
        offset?: number;
        params?: any;
        filterRawData?: string;
    };
    abstract setSampling(args: {
        aggregation: string;
        size: number;
        extent: number;
        unit: string;
        offset?: number;
        params?: any;
        filterRawData?: string;
    }): void;
    abstract updateChartData(trendData: TrendDataWgt): any;
    shouldUseBoundaryPoints(): boolean;
}
export default TrendDataDatasetWgt;
