import { ASTNode } from "../FormulaInterfaces";
export interface FormulaTrace {
    nodes: {
        [nodeName: string]: ASTNode;
    };
}
export declare class InverseFunctionAnalysis {
    findTrace(ast: ASTNode): FormulaTrace;
    inverse(ast: ASTNode, trace: FormulaTrace): {
        code: string;
        targetSelector: ASTNode;
    };
}
export declare function getNodeType(node: ASTNode): string;
