import type BaseGraphicWgt from "@/classes/BaseGraphicWgt";
import type BaseWgt from "@/classes/BaseWgt";
/**
 * Scales down a child of an absolute layout (e.g. SynopticWgt) so that it takes at most NEW_CHILD_MAX_FRACTION
 * of the layout size, keeping its aspect ratio and its top-left corner.
 * Sizes are compared in the layout coordinates: the child bounds include its own transformation,
 * so widgets scaled through their mtx (xformScaling) are measured by their rendered size.
 */
export declare function scaleChildToFitLayout(layout: BaseGraphicWgt, child: BaseGraphicWgt): void;
/**
 * Lets the parent layout adapt a widget just created by the user (e.g. dropped from the gallery).
 * Must not be used for widgets restored with their own bounds (paste, undo/redo).
 */
export declare function fitNewChild(parent: BaseWgt, child: BaseWgt): void;
