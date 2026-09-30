import DashboardMigration from "./DashboardMigration";
import { IDashboardSerialization } from '../../interfaces/dashboard';
export default class FormulaMigration extends DashboardMigration {
    message: string;
    check(initState: IDashboardSerialization): boolean;
    private getAllXForm;
    migrate(initState: IDashboardSerialization): Promise<void>;
}
