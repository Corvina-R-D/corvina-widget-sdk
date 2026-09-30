import { IXFormSerialization } from '../xForm';
import Action from './Action';
import { Dashboard, DataLink } from '@/corvina-model';
export interface IAddDataLinkArgs {
    id?: string;
    sourceId: string;
    targetId: string;
    srcProp: string;
    tgtProp: string;
    permission: string;
    xForm?: IXFormSerialization;
    linkToModel?: boolean;
    tagIndex?: number;
}
export declare class AddDataLink extends Action {
    args: IAddDataLinkArgs;
    previousValue: any;
    constructor(args: IAddDataLinkArgs, dashboard: Dashboard);
    private resolveProperty;
    getDataLink(): DataLink;
    do(): DataLink;
    undo(): void;
}
