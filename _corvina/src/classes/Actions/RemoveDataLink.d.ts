import Action from './Action';
import { Dashboard } from '@/corvina-model';
import { DatalinkPermission } from '@/interfaces/datalink';
export interface IRemoveDataLinkArgs {
    id?: string;
    sourceId?: string;
    targetId?: string;
    srcProp?: string;
    tgtProp: string;
    xForm?: any;
    permission?: DatalinkPermission;
}
export declare class RemoveDataLink extends Action {
    args: IRemoveDataLinkArgs;
    constructor(args: IRemoveDataLinkArgs, dashboard: Dashboard);
    do(): void;
    undo(): void;
}
