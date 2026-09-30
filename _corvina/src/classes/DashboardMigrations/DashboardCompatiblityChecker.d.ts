/**
 * Verify compatiblity with current dashboard editor version.
 */
import DashboardMigration from "./DashboardMigration";
declare class CompatibilityChecker {
    private migrations;
    constructor(list: DashboardMigration[]);
    migrate(initState: any): Promise<void>;
}
declare const DashboardCompatibilityChecker: CompatibilityChecker;
export default DashboardCompatibilityChecker;
