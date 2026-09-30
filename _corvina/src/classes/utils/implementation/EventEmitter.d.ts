/**
 * Simple Event Emitter implementation that not depends on from Vue.
 * It fit better test environments and can be used in non-Vue contexts.
 */
declare class EventEmitter {
    private callbacks;
    subscribe(cb: (event: any) => void): () => void;
    emit(event: any): void;
}
export default EventEmitter;
