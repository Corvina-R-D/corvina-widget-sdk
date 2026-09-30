import MutationLog from './MutationLog';
import { Action } from '../Actions/Actions';
declare class HistoryManager {
    isRecording: boolean;
    private recording;
    private done;
    private undone;
    private maxLogs;
    setMaxLogs(maxLogs: any): void;
    clear(): void;
    record(action: Action): void;
    getRecording(): MutationLog;
    getLastActionDone(): Action;
    getLastRecordedAction(): Action;
    save(): void;
    undo(): void;
    redo(): void;
    private executeUndo;
    private executeRedo;
}
declare const _default: HistoryManager;
export default _default;
