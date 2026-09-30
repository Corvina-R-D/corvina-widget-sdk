import { xForm } from "@/corvina-module";
import { SelectorInfo, FormulaCompileOptions, ResultDiff, ResultFormulaAnalysis, IFormulaDefinition, ICompilationResult } from "./FormulaInterfaces";
export default class FormulaUtility {
    private static instance;
    static getInstance(): FormulaUtility;
    static compileFormula(source: string, options?: FormulaCompileOptions, variables?: any, selectorsInfo?: SelectorInfo[]): ICompilationResult;
    static analysis(compiled: ICompilationResult): ResultFormulaAnalysis;
    static diff(source: string, target: string, options: FormulaCompileOptions): ResultDiff;
    migrateSelector(code: string): any;
    static replace(definition: IFormulaDefinition, varId: string, value: string): string;
    static defsEqual(defA: IFormulaDefinition, defB: IFormulaDefinition): boolean;
    static calcSelectorsDeps(deps: {
        [dep: string]: number[];
    }, id: string | number): number[];
    static createSelectorFunction(context: xForm, map?: Map<string, string>): (body: string, id: string) => any;
    /**
     * This function is the implementation of the selector function $(...)
     */
    private static bindContext;
    /**
     * This function is the implementation of the selector function $(...)
     * that collect information about source of the selector
     */
    private static bindContextWithSourceMap;
}
