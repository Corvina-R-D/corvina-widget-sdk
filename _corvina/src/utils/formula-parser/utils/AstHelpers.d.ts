import { IASTNode, IUnsafeInput } from '../interfaces';
export declare const DevicePropertyCall = "$";
export declare const BuiltinFunctions: {
    $: {
        compiled: {};
    };
    abs: {
        compiled: any;
    };
    acos: {
        compiled: any;
    };
    acosh: {
        compiled: any;
    };
    asin: {
        compiled: any;
    };
    asinh: {
        compiled: any;
    };
    atan: {
        compiled: any;
    };
    atan2: {
        compiled: any;
    };
    atanh: {
        compiled: any;
    };
    cbrt: {
        compiled: any;
    };
    ceil: {
        compiled: any;
    };
    clz32: {
        compiled: any;
    };
    cos: {
        compiled: any;
    };
    cosh: {
        compiled: any;
    };
    exp: {
        compiled: any;
    };
    expm1: {
        compiled: any;
    };
    floor: {
        compiled: any;
    };
    fround: {
        compiled: any;
    };
    hypot: {
        compiled: any;
    };
    imul: {
        compiled: any;
    };
    log: {
        compiled: any;
    };
    log10: {
        compiled: any;
    };
    log1p: {
        compiled: any;
    };
    log2: {
        compiled: any;
    };
    max: {
        compiled: any;
    };
    min: {
        compiled: any;
    };
    pow: {
        compiled: any;
    };
    random: {
        compiled: any;
    };
    round: {
        compiled: any;
    };
    sign: {
        compiled: any;
    };
    sin: {
        compiled: any;
    };
    sinh: {
        compiled: any;
    };
    sqrt: {
        compiled: any;
    };
    tan: {
        compiled: any;
    };
    tanh: {
        compiled: any;
    };
    trunc: {
        compiled: any;
    };
    map: {
        compiled: {};
    };
    reduce: {
        compiled: {};
    };
    some: {
        compiled: {};
    };
    sum: {
        compiled: any;
    };
    avg: {
        compiled: any;
    };
    DateFromString: {
        compiled: any;
    };
};
export declare const CustomBuiltinFunctions: {
    sum: (array: number[]) => number;
    avg: (array: number[]) => number;
    DateFromString: (dateISOString: string) => number;
};
export type BuiltinFunctionsType = keyof typeof BuiltinFunctions;
export declare const BuiltinConstants: {
    E: {
        compiled: any;
    };
    LN10: {
        compiled: any;
    };
    LN2: {
        compiled: any;
    };
    LOG10E: {
        compiled: any;
    };
    LOG2E: {
        compiled: any;
    };
    PI: {
        compiled: any;
    };
    SQRT1_2: {
        compiled: any;
    };
    SQRT2: {
        compiled: any;
    };
};
export type BuiltinConstantsType = keyof typeof BuiltinConstants;
export declare const isBuiltinFunction: (x: string) => x is BuiltinFunctionsType;
export declare const isBuiltinConstant: (x: string) => x is BuiltinConstantsType;
export declare const replaceOperators: (node: IASTNode, operators: Array<{
    variable: string;
    type: string;
}>) => IASTNode | null;
export declare const replaceBuiltinFunctions: (node: IASTNode) => IASTNode | null;
export declare const replaceBuiltinConstant: (node: IASTNode) => IASTNode;
export declare const replaceBuiltinConstants: (node: IASTNode) => IASTNode;
/**
 * Internal only. Generatates JavaScript functions
 *
 * @param {IUnsafeInput} code object that contains the AST and the list of operators
 * @param {AstNode} code.ast AST tree
 * @param {Array<{ variable: string; type: string }>} code.operators List of function variables
 * @returns {Function} Returns a JavaScript function
 */
export declare const unsafe: (code: IUnsafeInput) => Function;
export declare const indentifierIsUndefined: (node: any) => boolean;
export declare const indentifierIsNull: (node: any) => boolean;
