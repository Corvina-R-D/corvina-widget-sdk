import BaseGallery from './BaseGallery';
export declare class DatasetWgtGallery extends BaseGallery {
    constructor();
    getDefaultConfiguration(galleryMode: any): {
        id: string;
        type: string;
        class: string;
        label: string;
        value: number;
        color: any;
        yAxis: number;
    };
}
export declare const DatasetWgt: DatasetWgtGallery;
