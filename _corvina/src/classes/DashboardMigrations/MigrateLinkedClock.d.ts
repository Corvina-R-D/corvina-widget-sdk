import DashboardMigration from "./DashboardMigration";
export default class MigrateLinkedClock extends DashboardMigration {
    message: string;
    private getClockManager;
    private hasStartEndDatalink;
    check(initState: any): boolean;
    migrate(initState: any): Promise<any>;
}
