import { DashboardType } from "@/interfaces/dashboard";
/**
 * Feature flags controlling editor/viewer capabilities.
 * Each flag enables or disables a specific aspect of the editor UI or behavior.
 */
export interface EditorFeatures {
    viewportSimulator: "responsive" | "paper";
    viewportSimulatorDefaultOpen: boolean;
    gridLayoutBreakpoints: boolean;
}
export interface DashboardProfile {
    name: string;
    gallery: string[] | null;
    features: EditorFeatures;
    forbiddenGallery?: string[];
}
export interface DashboardTypeEntry {
    type: DashboardType;
    configuration: DashboardProfile;
    enabled: boolean;
}
export interface EditorProfileConfiguration {
    dashboardTypes: DashboardTypeEntry[];
}
