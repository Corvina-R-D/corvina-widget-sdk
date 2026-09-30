import { StatefulOperator } from '../utils/StatefulOperators';
export interface IUnsafeInput {
    ast: IASTNode;
    operators: Array<{
        variable: string;
        type: string;
    }>;
}
export interface ICompiledCode {
    ast: IASTNode;
    operators: Array<{
        variable: string;
        type: string;
    }>;
    extractedTags?: Set<IQuerySource>;
}
export interface IContext {
    [variableName: string]: StatefulOperator | null;
}
export interface IErrorConstructor {
    captureStackTrace(thisArg: any, func: any): void;
}
export interface IModelMarker {
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
    message: string;
    severity?: any;
}
export interface IQuerySource {
    deviceId: string | undefined;
    modelPath: string | undefined;
    id?: string;
}
export interface IFunctionWithExtractedTags extends Function {
    extractedTags?: Set<IQuerySource>;
}
export interface IASTNode {
    type: string;
    [property: string]: any;
}
export interface IValidateResult {
    ast: IASTNode | null;
    status: boolean;
    error?: string;
    markers?: IModelMarker[];
}
