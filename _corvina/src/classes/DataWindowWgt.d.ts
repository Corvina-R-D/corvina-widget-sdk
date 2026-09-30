import { ClockWgt } from "@/corvina-model";
export declare enum DATAWINDOW_MODE {
    DURATION = 0,// Autoscroll: Form now to X units
    FIXED_INTERVAL = 1,// Interval: From X to Y
    RELATIVE = 2
}
/**
 * DataWindowWgt will be the default ClockWgt.
 * We keep this class for compatibility with projects created before the introduction of the ClockWgt.
 */
declare class DataWindowWgt extends ClockWgt {
    constructor({ initState, isLoading, parent }: {
        initState: any;
        isLoading: any;
        parent: any;
    });
    serialize(): any;
}
export default DataWindowWgt;
