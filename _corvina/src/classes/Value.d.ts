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
    constructor(value: any, quality?: number, timestamp?: number);
    /**
     * Set value and metainfo.
     * - Envelope `{ v, q?, ts? }`: updates only the fields present. A Value instance in `v` is
     *   unwrapped, so the Value never wraps another Value; plain objects in `v` are payload and kept.
     * - Envelope with `v` undefined: empty value, quality UNCERTAIN unless the envelope has one.
     * - Any other value (null and undefined included): quality UNCERTAIN and current timestamp.
     */
    setValue(data: Partial<ValueData<T>>): void;
    setValue(value: T): void;
    onSetValue(_args: {
        oldValue: ValueData<T>;
        newValue: Value<T>;
    }): void;
    /**
     * Return the wrapped value and its metainfo.
     * @returns Return the value the and metainfo { v, q, ts }
     */
    getValue(): ValueData<T>;
    setPropertyHandler(propertyHandler: Record<string, unknown>): void;
    /**
     * Unwrap every level of wrapping, both `Value` instances and serialized `{ v }` envelopes.
     * Iterative, with protection against circular references.
     */
    static unwrap<T>(value: unknown): T;
    /**
     * Unwrap only `Value` instances, the nested wrapping bug. Plain objects, serialized `{ v }`
     * envelopes included, are left as they are: in the shared APIs (setValue, getPropertyValue)
     * they can be payload, e.g. a datasource record with a field named `v`.
     * Use {@link Value.unwrap} at the boundaries where a serialized envelope is expected.
     */
    static unwrapInstances<T>(value: unknown): T;
    /**
     * @deprecated Use {@link Value.unwrap}. Kept for custom widgets built against the old API.
     */
    static resolve<T>(value: unknown): T;
    /**
     * Return the wrapped value. Resolve the nested value issue
     * @returns Return the wrapped value
     */
    resolve(): T;
    /**
     * Meaningful alias for the method @see {@link unwrap}
     * @returns Return the wrapped value
     */
    unwrap(): T;
    /** Number of wrapping levels below `this.v` */
    nested(): number;
    mutate<K>(f: (x: T) => K): Value<K>;
    fmap(f: (x: T, y: T) => T, v: Value<T>): Value<T>;
    equal(v: Value<any>): boolean;
    setDatalink(): void;
    unsetDatalink(): void;
}
