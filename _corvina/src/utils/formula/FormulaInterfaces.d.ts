export interface ASTNode {
    type: string;
    [property: string]: any;
}
export interface FormulaUtilityOptions {
    replaceTag: boolean;
    concatenate: boolean;
    evaluate?: boolean;
    decorateSelectorFunction?: boolean;
    calculateInverse?: boolean;
}
export interface IFormulaState {
    selectors: string[];
    selectorsInfo: SelectorInfo[];
    vars: {
        [name: string]: any;
    };
    inSelector: number;
    decoratorSelectorCounter: number;
    selectorFunctionDeps: {
        [index: string]: string[];
    };
    inverseTargetSelector: {
        node: ASTNode;
        name: string;
    };
    firstSelector: {
        node: ASTNode;
        name: string;
    };
}
export interface SelectorInfo {
    sourceId: string;
    srcProp: string;
    tgtProp: string;
    evaluated?: boolean;
    isLocalProperty?: boolean;
    nested?: boolean;
}
export interface FormulaCompileOptions {
    concatenate?: boolean;
    limits?: {
        maxNumberOfVariables?: number;
    };
    decorateSelectorFunction?: boolean;
}
export declare const NameSelectorFunction = "$";
export declare enum ErrorsCode {
    EMPTY = 0,
    JS = 1,
    EXCEEDED_MAX_VARIABLES_NUMBER = 2
}
export interface FormulaErrors {
    code: ErrorsCode;
    description: string;
}
export interface ResultCompiler {
    selectorsInfo: SelectorInfo[];
    compiledFormula: string;
    errors: FormulaErrors[];
    selectorsFunctionDeps: {
        [id: string]: any;
    };
}
export interface ResultDiff {
    previousSelectorsInfo: SelectorInfo[];
    newSelectorsInfo: SelectorInfo[];
    selectorsAdded: SelectorInfo[];
    selectorsRemoved: SelectorInfo[];
    previousCompiledFormula: string;
    newCompiledFormula: string;
    newErrors: FormulaErrors[];
    previousErrors: FormulaErrors[];
}
export interface ResultFormulaAnalysis {
    composition: "mixed" | "remote" | "local";
    tags: string[];
    widgets: string[];
    map: {
        [varName: string]: {
            id: string;
            prop: string;
        };
    };
    selectors: SelectorInfo[];
    selectorsFunctionDeps: {
        [id: string]: any;
    };
    inverse?: {
        compiledFormula: string;
        targetSelector: string;
    };
    firstSelector?: string;
}
export interface IFormulaVariables {
    [name: string]: any;
}
export interface IFormulaDefinition {
    formula: string;
    compiledExpression: string;
    compiledDefinition: string;
    info: ResultFormulaAnalysis;
    variables: IFormulaVariables;
}
export interface ICompilationResult {
    selectorsInfo: SelectorInfo[];
    compiledFormula: string;
    errors: FormulaErrors[];
    selectorsFunctionDeps: {
        [index: string]: string[];
    };
    inverse?: {
        compiledFormula?: string;
        targetSelector?: string;
    };
    firstSelector?: string;
}
