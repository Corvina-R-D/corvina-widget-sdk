import DatasetPropsHandler from './propertiesHandlers/DatasetPropsHandler';
import { DatasetWgtGallery } from './DatasetWgt';
import IPropertyHandler from './propertiesHandlers/IPropertyHandler';
export declare const DatasetTypevalue: {
    markerCircle: string;
    markerSquare: string;
    markerDiamond: string;
    markerCross: string;
    markerX: string;
    markerStar: string;
    markerTriangleleft: string;
    markerTriangleright: string;
    bar: string;
    line: string;
};
export default class StubDatasetWgtPropsHandler extends DatasetPropsHandler {
    active: IPropertyHandler;
    datasetType: IPropertyHandler;
    createCustomPropsHandler(): void;
}
declare class StubDatasetWgtGallery extends DatasetWgtGallery {
    constructor();
    getDefaultConfiguration(galleryMode: any): {
        id: string;
        type: string;
        class: string;
        label: string;
        active: boolean;
        value: number;
        color: any;
        datasetType: string;
        yAxis: number;
    };
}
export declare const StubDatasetWgt: StubDatasetWgtGallery;
export {};
