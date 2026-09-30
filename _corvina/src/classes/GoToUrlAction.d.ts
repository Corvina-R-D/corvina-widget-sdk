import { ActionWgt, Value } from "@/corvina-model";
export default class GoToUrlAction extends ActionWgt {
    actionType: string;
    params: IGoToUrlParams;
    constructor(args: any);
    execute(): void;
}
export interface IGoToUrlParams {
    url: Value<string>;
    newTab: boolean;
}
