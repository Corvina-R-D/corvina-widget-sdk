import { LegacyWgt, BaseGraphicWgt } from "@/corvina-model";
export default class ImageWgt extends LegacyWgt {
    imageBase64: string;
    corvinaScale: string;
    fixedHeight: number;
    fixedWidth: number;
    vAlign: string;
    hAlign: string;
    preserveAspectRatio: boolean;
    constructor(args: any);
    loadAssetsFromStorage(): Promise<void>;
    protected updateAssetsReferenceCounter(): void;
    protected freeAssetsData(serializedWgt: any): void;
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    setParentBounds(x: number, y: number, width: number, height: number, parentWgt?: BaseGraphicWgt): void;
    serialize(): import("./BaseGraphicWgt").IBaseGraphicWidgetSerialization;
    get image(): string;
    set image(value: string);
    getStyles(): {
        [property: string]: string | number;
    };
    setLegacyInstance(legacyInstance: any): void;
    private getLegacyInstanceHTMLImage;
    private updateImageSize;
    private alignImage;
}
