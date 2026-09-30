import { DataLink } from "@/corvina-model";
import BarChartWgt from "./BarChartWgt";
import { Value } from "@/corvina-model";
import HierarchyAggregationDatasourceWgt from "./HierarchyAggregationDatasourceWgt";
export default class BarChartDataDrillWgt extends BarChartWgt {
    private legendOrientation;
    private legendFontColor;
    private showSourcePath;
    private xAxisLabel;
    private xAxisColor;
    sourceRoot: Value<object>;
    sourceModel: Value<Array<{
        id: string;
        value: string;
    }>>;
    sourcePath: Value<string>;
    datasource: HierarchyAggregationDatasourceWgt;
    fetchingData: number;
    interacting: boolean;
    refresh: () => void;
    constructor(args: any);
    serialize(): any;
    addDatalink(dl: any): DataLink;
    removeDatalink(dl: DataLink): void;
    directRefresh(): void;
    private safeRefresh;
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    cleanDataset(): void;
    updateModel(): void;
}
