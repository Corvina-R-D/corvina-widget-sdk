import BaseWgt from "./BaseWgt";
import Compareable from "./Compare";
export interface Variable {
    id: string;
    label: string;
    type: string;
    value: any;
    options?: string[] | Array<{
        key: string;
        value: string;
    }>;
}
export declare class VariablesDefinitions extends Compareable<VariablesDefinitions> {
    defs: {
        [id: string]: Variable;
    };
    constructor(definitions?: {
        [id: string]: Variable;
    });
    [Symbol.iterator]: () => {
        defs: {
            [id: string]: Variable;
        };
        list: string[];
        i: number;
        next(): {
            done: boolean;
            value?: Variable;
        };
    };
    get(id: string): Variable;
    set(id: string, v: Variable): Variable;
    equals(object: VariablesDefinitions): boolean;
    list(): string[];
    getDefinitions(): Variable[];
    clone(): VariablesDefinitions;
    toJSON(): {
        [id: string]: Variable;
    };
}
export default class VariablesWidget extends BaseWgt {
    private definitions;
    private varIds;
    constructor(args: any);
    private optionsToLanguageManager;
    setPropertyLabel({ wgtId, prop, value }: {
        wgtId: any;
        prop: any;
        value: any;
    }): void;
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    private updateLabelVar;
    private updateVarIds;
    getPropertyValue(property: string): any;
    serialize(): import("@/corvina-model").IWidgetSerialization;
}
