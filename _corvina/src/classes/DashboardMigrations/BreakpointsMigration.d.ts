import DashboardMigration from "./DashboardMigration";
export default class BreakpointsMigration extends DashboardMigration {
    message: string;
    check(initState: any): boolean;
    migrate(initState: any): Promise<void>;
    migrateToNewBrekpoints(wgt: any): void;
}
