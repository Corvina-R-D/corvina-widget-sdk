import { ActionWgt } from "@/corvina-model";
export default class ParametricAction extends ActionWgt {
    actionType: string;
    params: IParamActionParams;
    customEvents: string[];
    constructor(args: any);
    execute(data: any): void;
    private checkConditionIsTrue;
}
export interface IParamActionParams {
    mapIdConditions: Map<string, string>;
}
