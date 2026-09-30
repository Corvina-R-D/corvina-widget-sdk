import BaseWgt from './BaseWgt';
export default class FilterModel extends BaseWgt {
    private filterType;
    private value;
    constructor(args: any);
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    serialize(): import("./BaseWgt").IWidgetSerialization;
}
