import Value from "../Value";
type ClockID = string;
declare class ReactiveClockCache {
    private _clockData;
    private _dataCachedRange;
    constructor();
    setValue(clock: ClockID, value: any, range: {
        from: number;
        to: number;
    }): void;
    getValue(clock: ClockID): {
        data: Value<any>;
        range: {
            from: number;
            to: number;
        };
    };
    getCacheRange(clock: ClockID): {
        from: number;
        to: number;
    };
    hasValue(clock: ClockID): boolean;
}
export default ReactiveClockCache;
