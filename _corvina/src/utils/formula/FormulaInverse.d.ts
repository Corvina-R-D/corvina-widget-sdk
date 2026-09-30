import { ASTNode } from "./FormulaInterfaces";
export declare function inverse(ast: ASTNode): {
    code: string;
    targetSelector: ASTNode;
};
