import DashboardMigration from "./DashboardMigration";
import { IDashboardSerialization } from '../../interfaces/dashboard';
export default class UserGroupIdToNameMigration extends DashboardMigration {
    message: string;
    private getAllWidgets;
    private hasNumericGroupIds;
    check(initState: IDashboardSerialization): boolean;
    private confirmMigration;
    migrate(initState: IDashboardSerialization): Promise<boolean>;
}
