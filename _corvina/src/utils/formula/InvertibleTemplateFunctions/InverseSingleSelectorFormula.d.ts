import { ASTNode } from "../FormulaInterfaces";
import { InverseFunctionAnalysis, FormulaTrace } from "./InversetFunctionAnalysis";
export declare class SingleSelectorFormula extends InverseFunctionAnalysis {
    findTrace(ast: ASTNode): FormulaTrace;
    inverse(ast: ASTNode, trace: FormulaTrace): {
        code: string;
        targetSelector: ASTNode;
    };
}
