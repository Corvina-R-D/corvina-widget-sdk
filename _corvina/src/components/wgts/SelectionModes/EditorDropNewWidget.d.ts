import { BaseGraphicWgt } from "../../../corvina-module";
export default class EditorDropNewWidget {
    private root;
    private target;
    private position;
    private posBackup;
    private operation;
    constructor(root: BaseGraphicWgt, target: BaseGraphicWgt, position: {
        x: number;
        y: number;
    }, operation: {
        source: string;
        type: string;
        version?: string;
        data?: any;
    });
    private addWidgetToSynoptic;
    private addWidgetToFreeGrid;
    private moveWidget;
    private switchWidgets;
    private canSwitch;
    do(): Promise<boolean>;
}
