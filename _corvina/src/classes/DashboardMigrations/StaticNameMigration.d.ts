import BaseWgt from "../BaseWgt";
import DashboardMigration from "./DashboardMigration";
export default class StaticNameMigration extends DashboardMigration {
    message: string;
    check(initState: any): any;
    migrate(initState: any): Promise<void>;
    migrateToStaticName(wgt: BaseWgt): Promise<void>;
}
