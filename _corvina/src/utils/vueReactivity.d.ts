/**
 * Helpers to keep large, imperatively-managed data out of Vue 2's reactive graph.
 *
 * Vue 2 observes an array by patching its `__proto__` (`protoAugment`) so that the mutating
 * methods notify watchers. That patch takes the array off V8's fast path for builtins: on a
 * 160k-point series `slice()` goes from ~1 ms to ~6 ms and `concat()` from ~1.8 ms to ~3.8 ms,
 * and the penalty follows the array everywhere it is later used (chart adapters, `map`, plotly).
 *
 * Time series never need that reactivity: every consumer is notified explicitly
 * (`HistoricalDataSet.updateChartData`, `SchedulerDataRequest.onDataUpdate`, `emit()`), so
 * observing them is pure overhead.
 */
/**
 * Marks `value` so Vue 2 will never observe it, wherever it is stored later on — including
 * reactive properties of other widgets and component `data`. The value stays a plain, mutable
 * array/object. Idempotent, and a no-op on primitives and non-extensible values (Vue already
 * skips those).
 */
export declare function markNonReactive<T>(value: T): T;
/** True when Vue 2 has observed `value` (i.e. it carries an Observer and a patched prototype). */
export declare function isObserved(value: unknown): boolean;
/**
 * Defines an own property Vue's `Observer.walk()` cannot see: it only visits own *enumerable*
 * keys, so a hidden property is never turned into a reactive getter/setter.
 */
export declare function defineHiddenProperty(target: object, key: string, value: unknown): void;
