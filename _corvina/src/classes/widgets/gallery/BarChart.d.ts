import BaseGallery from './BaseGallery';
import Value from '../../Value';
import { WidgetDataModel } from '@/classes/WidgetFactory';
export declare class BarChartGallery extends BaseGallery {
    constructor();
    getDefaultConfiguration(galleryMode: any): {
        id: string;
        studioId: string;
        type: string;
        class: string;
        subtype: string;
        position: string;
        display: string;
        supportedIn3D: boolean;
        x: number;
        y: number;
        width: number;
        height: number;
        orientation: Value<unknown>;
        wgts: {
            studioId: string;
            type: string;
            class: string;
            label: string;
            value: number;
            color: any;
            yAxis: number;
        }[];
    };
    getDataModel(): WidgetDataModel;
}
export declare const BarChart: BarChartGallery;
