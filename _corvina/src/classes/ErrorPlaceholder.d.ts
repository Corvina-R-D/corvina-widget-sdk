import { BaseGraphicWgt } from "@/corvina-model";
export default class ErrorPlaceholderWgt extends BaseGraphicWgt {
    private widgetName;
    private error;
    private originalSerialization;
    constructor(args: any);
    serialize(): any;
    getOriginalWidget(): any;
    getStyles(): {
        [property: string]: string | number;
    };
}
