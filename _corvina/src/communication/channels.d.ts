interface Notifier {
    cb: (value: Object, timestamp?: any) => any;
    updateCallback: (cb: (Object: any) => any) => void;
    size(): number;
}
export declare class WSDataChannel {
    private static triggersRefCount;
    private static socket;
    private static platformToken;
    private static _initializeWebSocket;
    private static orgId;
    private static retryTimer;
    private static pingTimeout;
    private static pingInterval;
    private static fatalErrorCallback;
    private static channelErrorCallback;
    private static unWatchTokenCb;
    private static opening;
    /** Consecutive failed reconnections, used to back off. Reset on a successful open. */
    private static reconnectAttempts;
    private static readonly RECONNECT_BASE_MS;
    private static readonly RECONNECT_MAX_MS;
    private static readonly RECONNECT_NO_CREDITS_MS;
    /**
     * Close codes the backend uses for conditions that reconnecting cannot fix: a token whose user
     * no longer matches the one the socket was opened for, and an organization whose realm cannot be
     * resolved. Retrying these is a hot loop against a failure that needs re-authentication or a
     * configuration change, so report them and stop.
     */
    private static readonly FATAL_CLOSE_CODES;
    /** Credits exhausted: recoverable, but only by someone buying credits - so back off a long way. */
    private static readonly NO_CREDITS_CLOSE_CODE;
    /**
     * A subscription the backend rejected with a retryable failure is re-established here, per
     * trigger, backed off. There is no attempt cap: the backoff already holds a failure that keeps
     * failing - Cassandra down for an hour, say - to one attempt every 30s, and giving up would
     * leave the panel blank with nothing left to revive it. A value arriving resets the delay,
     * since that is the only evidence the subscription actually works.
     */
    private static readonly RETRY_BASE_MS;
    private static readonly RETRY_MAX_MS;
    private static retries;
    static onFatalError(callback: (fatalError: {
        code: number;
        message: string;
    }) => void): void;
    /**
     * Called for every error the backend reports over the socket (a failed authorization, a model
     * path that matches no tag, a last known value that could not be read, a data channel that was
     * interrupted). These used to be printed to the console and dropped, which left the client
     * believing it was subscribed to something that was never going to send it anything.
     */
    static onChannelError(callback: (channelError: {
        reason: string;
        payload: any;
        retryable: boolean;
    }) => void): void;
    /** Exponential backoff with jitter: a restarting backend gets its clients back gradually. */
    private static reconnectDelay;
    static reset(): void;
    static watchToken(): void;
    static unWatchToken(): void;
    static initializeWebSocket(organizationId: number): Promise<void>;
    static _init(organizationId: number): Promise<unknown>;
    static reopen(): Promise<void>;
    static open(organizationId: number, deviceId: string, modelPath: string, cb: Notifier): Promise<void>;
    /**
     * @returns true if the channel has no more triggers, false otherwise
     */
    static close(deviceId: string, modelPath: string, cb: Notifier): Promise<boolean>;
    /**
     * Re-establishes a subscription the backend rejected with a retryable failure.
     *
     * The error frame does not say which operation failed, so the intent is taken from the trigger
     * map: a trigger still in it is one the application wants, and a trigger no longer in it was a
     * failed unwatch, or one closed since the failure.
     */
    private static scheduleRetry;
    private static runRetry;
    private static clearRetry;
    private static clearAllRetries;
    /**
     * The generic form of a model path: the backend answers with the concrete model version it
     * matched, as in Model:2/tag, while subscriptions are keyed by the wildcard form TagMgr builds,
     * which carries a star in place of that version. A path that is already generic has no version
     * to replace and is returned unchanged.
     */
    private static genericModelPath;
    /**
     * The key a subscription for this device and path is held under. The generic form wins when it
     * is the one stored, which is the production case: TagMgr subscribes with the wildcard path and
     * an error naming a concrete version has to resolve back onto it.
     *
     * Otherwise the path is taken as named. A backend error about a client operation echoes the very
     * path the client sent, so that is the right answer both for a subscription made by exact
     * version and for a trigger already gone from the map - a failed unwatch, whose retry still has
     * to name what the unwatch named.
     */
    private static resolveTriggerId;
    private static triggerId;
    private static id;
    private static deviceIdModelPathFromTriggerId;
}
export declare class WSTagChannel implements Notifier {
    constructor(organizationId: number, modelPath: string, deviceId: string, cb: (Object: any, timestamp?: string) => any);
    open(): Promise<void>;
    close(): Promise<boolean>;
    updateCallback(cb: (Object: any) => any): void;
    size(): number;
    addSlotTagName(name: any): void;
    removeSlotTagName(name: any): void;
    containsSlotTagName(name: any): boolean;
    getSlotTags(): string[];
    hasSlotTag(): boolean;
    cb: (Object: any) => void;
    modelPath: string;
    deviceId: string;
    organizationId: number;
    slotTagNames: Set<string>;
}
export {};
