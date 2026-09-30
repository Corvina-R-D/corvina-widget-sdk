import { ActionWgt } from "@/corvina-model";
import Value from "./Value";
export default class SetTagAction extends ActionWgt {
    actionType: string;
    params: IRemoteRequestParams;
    constructor(args: any);
    execute(): void;
}
export interface IRemoteRequestParams {
    tag: Value<string>;
    value: Value<string | number | boolean>;
}
