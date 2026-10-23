import type Value from "@/classes/Value";
/**
 * Serializes a date property as a timestamp.
 * While the property is linked to a source that is not available yet (e.g. the clock of a composed widget
 * whose datalinks are still loading) resolve() returns undefined: in this case the fallback is returned
 * (usually the timestamp of the initState), so the serialization does not fail and the value is not lost.
 */
export declare function serializeDateValue(value: Value<Date>, fallback?: number): number | undefined;
