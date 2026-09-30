import { IXFormSerialization } from "@/classes/xForm";
export declare function parseSource(expression: string): {
    prop: string;
    id: string;
};
export declare function compareXForm(a: IXFormSerialization, b: IXFormSerialization): boolean;
