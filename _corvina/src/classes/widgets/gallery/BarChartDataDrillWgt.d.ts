import { BarChartGallery } from "./BarChart";
import BarChartPropsHandler from "./propertiesHandlers/BarChartPropsHandler";
import IPropertyHandler from "./propertiesHandlers/IPropertyHandler";
import Value from "@/classes/Value";
export declare const horizontalOrientationMode: {
    horizontalTop: string;
    horizontalBottom: string;
    vertical: string;
    auto: string;
};
export default class BarChartDataDrillWgtPropsHandler extends BarChartPropsHandler {
    legendOrientation: IPropertyHandler;
    legendFontColor: IPropertyHandler;
    sourceRoot: IPropertyHandler;
    sourcePath: IPropertyHandler;
    sourceModel: IPropertyHandler;
    showSourcePath: IPropertyHandler;
    xAxisLabel: IPropertyHandler;
    xAxisColor: IPropertyHandler;
    createCustomPropsHandler(): void;
}
declare class BarChartDataDrillWgtGallery extends BarChartGallery {
    constructor();
    getDefaultConfiguration(galleryMode: any): {
        id: string;
        studioId: string;
        type: string;
        class: string;
        subtype: string;
        orientation: Value<unknown>;
        wgts: any[];
        position: string;
        display: string;
        supportedIn3D: boolean;
        x: number;
        y: number;
        width: number;
        height: number;
    };
    getDataModel(): any;
}
export declare const BarChartDataDrillWgt: BarChartDataDrillWgtGallery;
export {};
