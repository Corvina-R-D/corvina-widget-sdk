import { DataLink, DatasetWgt, Value } from "../corvina-model";
export default class StubDatasetWgt extends DatasetWgt {
    __stupPreSet: object;
    active: Value<boolean>;
    datasetType: string;
    constructor(args: any);
    serialize(): import("./BaseWgt").IWidgetSerialization;
    getDataStyle(): {
        datasetType: string;
        color: any;
        barBorderColor: any;
        barBorderWidth: number;
        yAxis: number;
    };
    addDatalink(dl: any): DataLink;
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    getPropertyValue(prop: any): any;
}
