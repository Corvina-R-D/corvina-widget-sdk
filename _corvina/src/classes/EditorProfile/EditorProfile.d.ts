import { DashboardType } from "@/interfaces/dashboard";
import { EditorProfileConfiguration, DashboardProfile } from "./types";
declare class EditorProfile {
    _configuration: EditorProfileConfiguration;
    constructor(configuration: EditorProfileConfiguration);
    isDashboardTypeEnabled(type: DashboardType): boolean;
    enableDashboardType(type: DashboardType): void;
    disableDashboardType(type: DashboardType): void;
    getDashboardProfile(args: {
        dashboardType: DashboardType;
    }): DashboardProfile;
}
declare const profile: EditorProfile;
export default profile;
