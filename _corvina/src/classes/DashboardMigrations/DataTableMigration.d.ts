import DashboardMigration from "./DashboardMigration";
import { IDashboardSerialization } from "../../interfaces/dashboard";
export default class DataTableMigration extends DashboardMigration {
    message: string;
    check(initState: IDashboardSerialization): boolean;
    private getAllDataTable;
    migrate(initState: IDashboardSerialization): Promise<void>;
}
