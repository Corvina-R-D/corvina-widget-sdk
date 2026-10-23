import { ClockWgt } from "@/corvina-model";
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
