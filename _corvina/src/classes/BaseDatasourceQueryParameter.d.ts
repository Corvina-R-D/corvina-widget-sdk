declare abstract class BaseDatasourceQueryParameter {
    abstract hasParameter(param: string): boolean;
    abstract getPropertyValue(param: string): any;
    abstract setPropertyValue(args: {
        prop: string;
        value: any;
    }): void;
    abstract formatAggregationParams(params?: any): any;
    abstract serialize(): any;
}
export default BaseDatasourceQueryParameter;
