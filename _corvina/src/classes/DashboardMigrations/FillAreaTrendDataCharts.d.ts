import DashboardMigration from "./DashboardMigration";
import { IDashboardSerialization } from '../../interfaces/dashboard';
export default class FillAreaTrendDataCharts extends DashboardMigration {
    message: string;
    check(initState: IDashboardSerialization): boolean;
    migrate(initState: IDashboardSerialization): Promise<void>;
    private updateFillAreaProperties;
    patchDatasetWgts(wgts: any[]): Promise<void>;
}
