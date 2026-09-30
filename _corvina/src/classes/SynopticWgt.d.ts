import { BaseWgt, GroupWgt } from "@/corvina-model";
import { LayoutType } from "@/constant/Layouts";
interface IAspectRatio {
    width: number;
    height: number;
}
export default class SynopticWgt extends GroupWgt {
    aspectRatio: IAspectRatio;
    dimensionReference: number;
    constructor(args: any);
    get image(): string;
    set image(value: string);
    setaR(onSetaR?: Function): void;
    private getGreatestCommondivisor;
    private getImgSize;
    getLayoutType(): LayoutType;
    addChild(child: BaseWgt): void;
    private scaleChild;
}
export {};
