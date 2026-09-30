interface Item {
    request: () => Promise<any>;
    signature: string;
}
export declare class AsyncQueueDebounced {
    private _items;
    private _delay;
    constructor(delay: number);
    enqueue(item: Item): Promise<void>;
    dequeue(): Promise<void>;
}
export {};
