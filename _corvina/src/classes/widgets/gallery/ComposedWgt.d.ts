import BaseGallery from "./BaseGallery";
declare class ComposedWgtGallery extends BaseGallery {
    constructor();
    getDefaultConfiguration(galleryMode: any): {
        width: number;
        height: number;
        x: number;
        y: number;
        cx: number;
        cy: number;
        class: string;
        type: string;
        elevation: number;
        datalinks: any[];
        grconf: {
            gr: {
                grGStkWidth: number;
                grGStkColor: string;
                grVUF: number;
                grHUF: number;
                grVOF: number;
                grHOF: number;
                grRows: number;
                grCols: number;
                s: number;
            };
            rowsProps: {
                minHeight: number;
                maxHeight: number;
                tMargin: number;
                bMargin: number;
                tStroke: number;
                bStroke: number;
                stretch: number;
            }[];
            colsProps: {
                rStkColor: string;
                lStkColor: string;
                minWidth: number;
                maxWidth: number;
                lMargin: number;
                rMargin: number;
                lStroke: number;
                rStroke: number;
                stretch: number;
            }[];
        }[];
        wgts: any[];
        content: {};
    };
}
export declare const ComposedWgt: ComposedWgtGallery;
export {};
