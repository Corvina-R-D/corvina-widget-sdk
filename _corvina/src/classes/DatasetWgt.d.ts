import { Value, DataLink } from "@/corvina-model";
import ChartWgt from "./ChartWgt";
import BaseDatasetWgt from "./BaseDatasetWgt";
export default class DatasetWgt extends BaseDatasetWgt {
    value: Value<any>;
    parent: ChartWgt;
    updateCallback: Function;
    yAxis: number;
    hasMultipleYAxis: boolean;
    constructor(args: any);
    private isLabelDefaultValue;
    addDatalink(dl: any): DataLink;
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    getPropertyValue(prop: any): any;
    onUpdate(cb: Function): void;
    serialize(): import("@/corvina-model").IWidgetSerialization;
}
