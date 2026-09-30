/**
 * It limits the number of concurrent requests (keeping a queue of 1000 pending requests)
 * It optionally cache the request result with a ttl
 */
declare class RequestsController {
    private queue;
    private queueLimit;
    private concurrent;
    private map;
    private monitor;
    constructor(limit: number, ttl?: number);
    request(r: () => Promise<any>, signature?: string, cache?: boolean): Promise<any>;
    private executeQueue;
    clear(): void;
}
export default RequestsController;
