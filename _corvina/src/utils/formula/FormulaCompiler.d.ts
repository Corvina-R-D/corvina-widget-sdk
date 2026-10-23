import { FormulaUtilityOptions, IFormulaState, ASTNode, SelectorInfo } from "./FormulaInterfaces";
export declare function compile(code: string, options: FormulaUtilityOptions, vars: {
    [name: string]: any;
}, selectorsInfo?: SelectorInfo[]): {
    code: string;
    state: any;
    inverse?: undefined;
    firstSelector?: undefined;
} | {
    code: string;
    state: IFormulaState;
    inverse: {
        code: string;
        selectorName: string;
    };
    firstSelector: string;
};
export declare function constantSelectorName(argument: ASTNode): string | undefined;
export declare function isSelectorFunction(node: ASTNode): boolean;
export declare function isArgumentLiteral(node: ASTNode): boolean;
export declare function isLocalSelector(selector: SelectorInfo): boolean;
export declare function parseTagName(name: string, varName: string, nested: boolean): SelectorInfo;
