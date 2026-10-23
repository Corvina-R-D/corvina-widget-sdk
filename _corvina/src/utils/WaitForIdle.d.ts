export declare const DEFAULT_IDLE_DELAY_MS = 5000;
export declare const DEFAULT_MAX_WAIT_MS = 30000;
export interface WaitForIdleOptions {
    idleDelayMs?: number;
    maxWaitMs?: number;
}
/**
 * Registers a new pending request.
 * @returns a unique ID that must be passed to removePendingRequest() when done.
 */
export declare function addPendingRequest(): string;
/**
 * Marks a pending request as completed.
 * Idempotent: calling with the same id more than once is safe.
 */
export declare function removePendingRequest(id: string): void;
/**
 * Resolves when no pending requests have been active for `idleDelayMs` (default 5 s).
 * Rejects after `maxWaitMs` (default 30 s) as a safety net.
 *
 * Example flow:
 * addPendingRequest()  → size=1 → start maxWait timer
 * addPendingRequest()  → size=2
 * removePendingRequest(id1) → size=1
 * removePendingRequest(id2) → size=0 → start idle timer. After idleDelayMs (e.g 5s) resolve.
 *
 * If before idleDelayMs expires, a new request is added:
 * addPendingRequest()  → size=1 → cancel idle timer, start maxWait timer
 * removePendingRequest(id3) → size=0 → cancel maxWait timer, start idle timer.
 * After idleDelayMs resolve.
 *
 *
 * @param options.idleDelayMs  ms of inactivity before resolving (default: 5000).
 * @param options.maxWaitMs    hard deadline in ms (default: 30000).
 */
export declare function waitForIdle(options?: WaitForIdleOptions): Promise<void>;
/** Resets all state. For use in unit tests only. */
export declare function _resetForTest(): void;
