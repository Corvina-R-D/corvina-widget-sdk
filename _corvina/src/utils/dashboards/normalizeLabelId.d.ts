/**
 * Normalizes a labelId to the string key that identifies a series in a chart (see DataAdapter.uniqueDatasetMap).
 * A labelId can arrive wrapped in a Value, or as a serialized `{ v, q, ts }` object, when it is copied from a
 * label or loaded from a dashboard saved with that shape: it is unwrapped and converted to string.
 * The fallback is returned for null, undefined and empty values.
 */
export declare function normalizeLabelId(value: unknown, fallback?: string): string;
