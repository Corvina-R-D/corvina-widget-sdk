import type BaseWgt from "@/classes/BaseWgt";
export interface ICategoryLabelTemplate {
    variables: {
        name: string;
        tag: string;
    }[];
    template: string;
}
export declare function categoryFunctionName(dataset: BaseWgt, labelTemplate: ICategoryLabelTemplate): string;
export declare function categoryMapFormula(variable: {
    name: string;
    tag: string;
}, sourceFormula: string): string;
