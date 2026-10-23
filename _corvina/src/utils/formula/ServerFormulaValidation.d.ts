import { FormulaValidationMarkerDTO, FormulaValidationRequestDTO, ServerFormulaContext } from "@/interfaces/IPlatformController";
import { PlatformTagName } from "./TagReferences";
/**
 * How the formula written by the user becomes the one platform-api runs, as the dashboard builds its query:
 * - raw: sent as written, e.g. a sample filter
 * - definition: the compiled definition (local selectors replaced by their value, the others by $("tag")), with tag
 *   names resolved to platform names (deviceId/modelPath), e.g. the function of a multiseries datasource
 * - localDefinition: the map of a datasource. With local selectors, as definition; with remote tags only, the formula
 *   as written with tag names resolved (DatasourceWgt trendDataFormula, then WSServerInterface.resolveTagName)
 * - postFilter: selectors of the datasource itself are replaced by $("data"), the others by their value
 * In definition and postFilter the dashboard computes the name of $(expression) with its values, e.g. the tag picked
 * in a variables widget, and sends $("name"); in a formula sent as written platform-api finds $(expression), and
 * rejects it: it only reads a tag named as written.
 */
export type ServerFormulaRewrite = "raw" | "definition" | "localDefinition" | "postFilter";
export interface ServerFormulaOptions {
    context: ServerFormulaContext;
    rewrite?: ServerFormulaRewrite;
}
export interface ServerFormulaMarker extends Omit<FormulaValidationMarkerDTO, "severity"> {
    /** monaco.MarkerSeverity */
    severity: number;
}
/** The formula cannot run on the server: warnings do not stop the user */
export declare function isServerFormulaError(marker: ServerFormulaMarker): boolean;
export interface IServerFormula {
    /** the formula platform-api runs */
    formula: string;
    /** From the positions of the formula platform-api runs to the positions of the formula written by the user */
    toFormulaMarker: (marker: ServerFormulaMarker) => ServerFormulaMarker;
}
export interface IServerFormulaContext {
    /** the widget the formula belongs to: its selectors are the data of a post filter */
    widgetId?: string;
    /** the platform names the dashboard resolves tag names to; without it tags keep their dashboard name */
    platformTagName?: PlatformTagName;
}
/**
 * Rewrites the formula as the dashboard sends it to platform-api, and maps the markers of the server back onto the
 * formula written by the user
 */
export declare function serverFormula(formula: string, rewrite?: ServerFormulaRewrite, context?: IServerFormulaContext): IServerFormula;
/** The formula platform-api runs, see serverFormula */
export declare function toServerFormula(formula: string, rewrite?: ServerFormulaRewrite, widgetId?: string, platformTagName?: PlatformTagName): string;
/**
 * Compiles the formula on platform-api as it will run, without running it.
 * Returns undefined when the validation could not run, e.g. an older platform-api without the endpoint.
 */
export declare function validateServerFormula(request: FormulaValidationRequestDTO): Promise<ServerFormulaMarker[] | undefined>;
/**
 * Builds the validation of a formula written by the user, when platform-api receives it inside another formula
 */
export type ServerValidationBuilder = (formula: string) => {
    request: FormulaValidationRequestDTO;
    /** From the positions of the request formula to the positions of the formula written by the user */
    toFormulaMarker?: (marker: ServerFormulaMarker) => ServerFormulaMarker;
} | undefined;
/** A marker on the whole formula, when the position cannot be told */
export declare function wholeFormulaMarker(formula: string, marker: ServerFormulaMarker): ServerFormulaMarker;
/** Moves the markers of a request formula made of `prefix + formula + suffix` onto the formula */
export declare function markerInside(prefix: string, formula: string): (marker: ServerFormulaMarker) => ServerFormulaMarker;
/**
 * Validates the formula while it is edited: only the markers of the last request are given
 */
export declare class ServerFormulaValidator {
    private onMarkers;
    private timer;
    private sequence;
    constructor(onMarkers: (markers: ServerFormulaMarker[]) => void);
    validate(request: FormulaValidationRequestDTO, toFormulaMarker?: (marker: ServerFormulaMarker) => ServerFormulaMarker): void;
    /** Validates a formula that platform-api receives inside another one */
    validateWith(builder: ServerValidationBuilder, formula: string): void;
    cancel(): void;
}
