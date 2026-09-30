import { BaseWgt, ClockMgrWgt, IWidgetSerialization } from "@/corvina-model";
import EventEmitter from "./utils/implementation/EventEmitter";
import { SizeUnit } from "@/utils/aggregation/Aggreagator";
type UpdateCallback = (data: any) => void;
export default class BaseDatasourceWgt extends BaseWgt {
    protected _clockManager: ClockMgrWgt;
    protected _clocks: string[];
    protected _dataUpdateEmitter: EventEmitter;
    constructor(args: any);
    private createClockDatalink;
    private removeClockDatalink;
    get clockManager(): ClockMgrWgt;
    get clocks(): string[];
    set clocks(clocks: string[]);
    addClock(clockId: string): void;
    removeClock(clockId: string): void;
    protected createMissingClockDatalinks(initState: any): void;
    onDataUpdate(cb: UpdateCallback): () => void;
    getColumns(): Array<string>;
    serialize(): IWidgetSerialization;
    getTimeResolution(): {
        size: number;
        extent: number;
        unit: SizeUnit;
    };
}
export {};
