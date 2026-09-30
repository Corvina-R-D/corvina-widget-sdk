export declare class CorsWorker {
    private readonly url;
    private readonly options?;
    constructor(url: RequestInfo, options?: WorkerOptions);
    createWorker(): Promise<any>;
}
