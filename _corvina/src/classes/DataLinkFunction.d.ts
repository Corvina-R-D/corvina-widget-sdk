export declare enum DataLinkFunctionType {
    SIMPLE = 0,
    DATASOURCE = 1
}
export interface IDatalinkFunctionSerialization extends Record<string, any> {
}
export declare class DataLinkFunction {
    type: DataLinkFunctionType;
    class: string;
    init(): void;
    setProperty(name: string, value: any): void;
    getProperty(name: string): any;
    getFunctionBody(): string;
    removeProperty(name: string): void;
    removeProperties(): void;
    getProperties(): Object;
    apply(sourceValue?: any): any;
    inverse(targetValue?: any): any;
    getInformation(): any;
    getResult(): any;
    applyHistorical(property: string, data: any): any;
    getTags(): Array<string>;
    hasInverse(): boolean;
    getInverse(): string;
    serialize(): IDatalinkFunctionSerialization;
    hasVariable(name: string): boolean;
}
