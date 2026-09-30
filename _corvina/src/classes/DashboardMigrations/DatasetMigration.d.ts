import DashboardMigration from "./DashboardMigration";
import { IDashboardSerialization } from '../../interfaces/dashboard';
import BaseWgt from "../BaseWgt";
export default class DatasetMigration extends DashboardMigration {
    message: string;
    check(initState: IDashboardSerialization): boolean;
    checkChildWgts(wgt: BaseWgt[]): boolean;
    migrate(initState: IDashboardSerialization): Promise<void>;
    patchDatasetWgts(wgts: any[]): Promise<void>;
}
