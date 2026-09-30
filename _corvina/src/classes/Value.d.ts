export declare enum VALUE_QUALITY_STATUS {
    GOOD = 192,// value is jm inheritance
    UNCERTAIN = 129,// value is jm inheritance
    BAD = 0
}
export interface ValueData<T> {
    v: T;
    q?: number;
    ts?: number;
    hasDatalink?: boolean;
}
export default class Value<T> implements ValueData<T> {
    v: T;
    q?: number;
    ts?: number;
    /** datalink source */
    addr?: string;
    hasDatalink?: boolean;
    constructor(value: any, quality?: number | undefined, timestamp?: number | undefined);
    setValue(value: any): any;
    setValue({ v, q, ts }: {
        v: any;
        q: any;
        ts: any;
    }): any;
    onSetValue({ oldValue, newValue }: {
        oldValue: any;
        newValue: any;
    }): void;
    /**
     * Return the wrapped value and its metainfo.
     * @returns Return the value the and metainfo timestamp and quality { v: any, t: number, q: number }
     */
    getValue(): ValueData<T>;
    setPropertyHandler(propertyHandler: any): void;
    /**
     * Return the wrapped value. Resolve the nested value issue
     * @returns Return the wrapped value
     */
    resolve(): T;
    static resolve<T>(value: any): T;
    /**
     * Meaningful alias for the method @see {@link resolve}
     * @returns Return the wrapped value
     */
    unwrap(): T;
    nested(): number;
    mutate<K>(f: (x: T) => K): Value<K>;
    fmap(f: (x: T, y: T) => T, v: Value<T>): Value<T>;
    equal(v: Value<any>): boolean;
    setDatalink(): void;
    unsetDatalink(): void;
}
