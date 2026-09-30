import BaseWgt from "./BaseWgt";
export default class QueryDataWgt extends BaseWgt {
    timestamps: number[];
    values: any[];
    enabled: boolean;
    private data;
    private alignment;
    private operator;
    private operatorParams;
    private sources;
    private functions;
    constructor(args: any);
    refresh(pStart?: number, pEnd?: number): Promise<void>;
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    getPropertyValue(property: string): any;
    clearTrendData(): void;
    private getDataLimit;
    private fetch;
    private formatError;
    serialize(): import("src/corvina-module").IWidgetSerialization;
}
