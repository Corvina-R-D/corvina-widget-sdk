import BaseWgt from "./BaseWgt";
export interface MatchColor {
    expression: string;
    color: string;
}
export declare class ColorSchemeWgt extends BaseWgt {
    private colors;
    private incrementalId;
    constructor(args: any);
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    getPropertyValue(property: string): any;
    addColor(color: string, expression?: string): void;
    removeColor(id: number): void;
    serialize(): import("./BaseWgt").IWidgetSerialization;
}
export default class ColorPaletteWgt extends BaseWgt {
    constructor(args: any);
    getPropertyValue(property: string): any;
    serialize(): import("./BaseWgt").IWidgetSerialization;
}
