import { DataLinkFunction, IDatalinkFunctionSerialization } from "./DataLinkFunction";
import { DataValue } from '../communication/axios/model/devicedata';
import { FormulaCompileOptions, FormulaErrors, ResultFormulaAnalysis, ResultCompiler, IFormulaVariables } from '@/utils/formula/FormulaInterfaces';
export declare enum XFORMULA_MODE {
    EVALUATE = "evaluate",
    DEFINITION = "definition",
    DATA_TYPE = "data_type"
}
export interface IXFormulaSerialization extends IDatalinkFunctionSerialization {
    formula: string;
    compiledExpression: string;
    info: ResultFormulaAnalysis;
    mode: XFORMULA_MODE;
}
export default class xFormula extends DataLinkFunction {
    result: any;
    formula: string;
    compiledExpression: string;
    variables: IFormulaVariables;
    executableExpression: Function;
    errors: FormulaErrors[];
    info: ResultFormulaAnalysis;
    mode: XFORMULA_MODE;
    selectorFunction: {
        $: Function;
        $map: Function;
    };
    static VAR_DEFINITION: RegExp;
    constructor(args: any);
    serialize(): {
        formula: string;
        compiledExpression: string;
        info: ResultFormulaAnalysis;
        mode: XFORMULA_MODE;
    };
    setProperty(name: string, value: any): void;
    getProperty(name: string): void;
    getProperties(): IFormulaVariables;
    getInformation(): any;
    getFunctionBody(): string;
    init(): void;
    private createExecutableExpression;
    private generateDefinition;
    private generateDataTypeFormula;
    getResult(): any;
    applyHistorical(property: string, data: DataValue[]): DataValue[];
    removeProperty(prop: any): void;
    removeProperties(): void;
    getTags(): string[];
    updateDefinition(): void;
    hasVariable(name: string): boolean;
    hasInverse(): boolean;
    getInverse(): string;
    static compileFormula(source: string, options?: FormulaCompileOptions, variables?: any): ResultCompiler;
    static analysis(formula: string, options?: any, variables?: any): ResultFormulaAnalysis;
    static diff(source: string, target: string, options: FormulaCompileOptions): import("@/utils/formula/FormulaInterfaces").ResultDiff;
    inverse(targetValue?: any): any;
}
