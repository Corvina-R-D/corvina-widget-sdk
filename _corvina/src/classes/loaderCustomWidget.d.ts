import { OrganizationGalleryAsset } from "../interfaces/dashboard";
interface JMWidgetManifest {
    icon: {
        name: string;
        data: string;
    };
    jmVersion: string;
    resources: {
        css: string;
    };
}
interface JMCWidgetPacket {
    definition: any;
    gallery: any;
    manifest: JMWidgetManifest;
}
export declare enum CustomWidgetClass {
    JM = 0,
    SDK = 1
}
export declare function addCustomWidgetToDashboardGallery(type: CustomWidgetClass, asset: OrganizationGalleryAsset, save?: boolean, refreshGallery?: boolean): string;
export declare function removeCustomWidgetFromDashboardGallery(type: CustomWidgetClass, packet: any): void;
export declare function getIconFromPacket(data: File, icon: string): Promise<File>;
export declare function parseCustomWidgetData(data: string | object | File): Promise<{
    type: CustomWidgetClass;
    name: string;
    data: string | File | object;
    error?: any;
    icon?: string | string[];
    widgets?: string[];
}>;
export declare function embedIcon(data: JMCWidgetPacket | File, icon: File): Promise<object | File>;
export declare function createFileFromObject(fileName: string, data: Object): File;
export {};
