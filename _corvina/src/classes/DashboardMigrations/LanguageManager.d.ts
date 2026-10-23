import DashboardMigration from "./DashboardMigration";
import { IDashboardSerialization } from '../../interfaces/dashboard';
export default class LanguageManagerMigration extends DashboardMigration {
    message: string;
    check(initState: IDashboardSerialization): boolean;
    private getAllCharts;
    migrate(initState: IDashboardSerialization): Promise<void>;
    private migrateDatasetSourceToModel;
    private addIgnoreSupporti18n;
}
