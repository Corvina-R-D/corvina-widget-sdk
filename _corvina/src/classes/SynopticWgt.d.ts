import { BaseGraphicWgt, GroupWgt } from "@/corvina-model";
import { LayoutType } from "@/constant/Layouts";
import { IAspectRatio } from "@/interfaces/Widgets";
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
    /**
     * Adapts a widget just added by the user (e.g. dropped from the gallery): a widget larger than 1/2.5 of the
     * synoptic is scaled down. Not applied in addChild, so pasted or restored widgets (undo/redo) keep their bounds.
     */
    fitNewChild(child: BaseGraphicWgt): void;
    private scaleChild;
}
