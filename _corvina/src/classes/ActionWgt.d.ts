import { BaseWgt } from "../corvina-model";
export default abstract class ActionWgt extends BaseWgt {
    abstract actionType: string;
    abstract params: any;
    constructor(params: any);
    serialize(): import("./BaseWgt").IWidgetSerialization;
    abstract execute(params?: any): any;
}
