import { LegacyWgt, BaseGraphicWgt, Value } from "@/corvina-model";
export default class ImageWgt extends LegacyWgt {
    imageBase64: Value<string>;
    image_url: Value<string>;
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
    get image(): Value<string>;
    set image(value: string);
    private applyImageToLegacy;
    getStyles(): {
        [property: string]: string | number;
    };
    setLegacyInstance(legacyInstance: any): void;
    private getLegacyInstanceHTMLImage;
    private updateImageSize;
    private alignImage;
}
