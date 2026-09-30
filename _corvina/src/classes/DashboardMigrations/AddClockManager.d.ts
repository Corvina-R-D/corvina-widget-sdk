import DashboardMigration from "./DashboardMigration";
export default class AddClockManager extends DashboardMigration {
    message: string;
    check(initState: any): boolean;
    migrate(initState: any): Promise<any>;
}
