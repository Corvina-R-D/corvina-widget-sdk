import BaseGallery from './BaseGallery';
import Value from '../../Value';
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
    getDataModel(): {
        type: string;
        links: {
            match: string;
            factory: {
                policy: string;
                type: string;
                properties: string[];
            }[];
        }[];
    }[];
}
export declare const BarChart: BarChartGallery;
