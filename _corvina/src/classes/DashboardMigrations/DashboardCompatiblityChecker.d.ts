/**
 * Verify compatibility with current dashboard editor version.
 */
import DashboardMigration from "./DashboardMigration";
import { IDashboardSerialization } from "@/interfaces/dashboard";
declare class CompatibilityChecker {
    private migrations;
    constructor(list: DashboardMigration[]);
    migrate(initState: IDashboardSerialization): Promise<boolean>;
}
declare const DashboardCompatibilityChecker: CompatibilityChecker;
export default DashboardCompatibilityChecker;
