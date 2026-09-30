import { BaseWgt, Value } from "@/corvina-model";
export default class BaseDatasetWgt extends BaseWgt {
    labelId: string;
    label: Value<any>;
    color: Value<any>;
    yAxis: number;
    hasMultipleYAxis: boolean;
    constructor(args: any);
    getDataStyle(): {
        color: any;
        barBorderColor: any;
        barBorderWidth: number;
        yAxis: number;
    };
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    serialize(): import("@/corvina-model").IWidgetSerialization;
}
