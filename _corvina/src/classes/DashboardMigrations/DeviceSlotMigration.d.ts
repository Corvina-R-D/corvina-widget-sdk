import DashboardMigration from "./DashboardMigration";
import BaseWgt from "../BaseWgt";
import { IDashboardSerialization } from '../../interfaces/dashboard';
export default class DeviceSlotMigration extends DashboardMigration {
    message: string;
    check(initState: any): boolean;
    migrate(initState: any): Promise<void>;
    migrateToDevSlotDashboard(initState: IDashboardSerialization): Promise<void>;
    migrateToDevSlotDatalinkSourcesRecursive(wgt: BaseWgt, newTagNameByOldTagName: {
        [oldTagName: string]: string;
    }): void;
}
