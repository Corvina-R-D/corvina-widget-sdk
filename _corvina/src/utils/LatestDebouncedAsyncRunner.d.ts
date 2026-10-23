export default class LatestDebouncedAsyncRunner<T> {
    private readonly runTarget;
    private latestTarget;
    private requestId;
    private isRunning;
    private runningPromise;
    private readonly debouncedRun;
    constructor(runTarget: (target: T) => Promise<void>, waitMs: number);
    private executeLatest;
    request(target: T): void;
    flush(): any;
    cancel(): void;
    /**
     * Run any pending work immediately and resolve once everything has fully
     * drained — the run already in flight plus any follow-up queued for a newer
     * target while it was running. Unlike `flush()`, this does not wait out the
     * debounce delay for re-armed follow-ups and reliably awaits async work.
     */
    settle(): Promise<void>;
}
