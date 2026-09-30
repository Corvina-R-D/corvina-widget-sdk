import { BaseWgt } from "@/corvina-model";
import ClockWgt from "@/classes/ClockWgt";
declare class ClockMgrWgt extends BaseWgt {
    private defaultClock;
    private defaultClockId;
    constructor(args: any);
    addChild(child: BaseWgt): void;
    private subscribeClock;
    getPropertyValue(prop: any): any;
    getClocks(): ClockWgt[];
    setDefaultClock(clockWgt: ClockWgt): void;
    getDefaultClock(): ClockWgt;
    generateClockName(): string;
    serialize(): any;
}
export default ClockMgrWgt;
