import { BaseWgt } from "@/corvina-module";
export declare enum ShowPropContext {
    ALL = 0,
    TwoD = 1,
    ThreeD = 2
}
export interface ArbitraryPropControlOptions {
    [options: string]: any;
}
export interface InputPropControlOptions {
    maxlength?: number;
    min?: number;
    max?: number;
    visible?: boolean;
    emptyStringsAsUndefined?: boolean;
    appendIcon?: string;
    appendIconTooltip?: string;
}
export interface DatalinkPropControlOptions {
    hideRemoveButton?: boolean;
}
export interface FormulaPropControlOptions {
    mode?: "definition" | "evaluate" | "data_type";
    hideRemoveButton?: boolean;
    height?: number;
    showResult?: boolean;
    clearable?: boolean;
    showErrorOnLocalProperty?: boolean;
    sanitizeRemoteClockProperty?: boolean;
    globalVariables?: string[];
    dropable?: boolean;
    showErrorFromMonacoEditor?: boolean;
    weakDependencies?: boolean;
}
export interface PropHandlerSet {
    [propName: string]: IPropertyHandler;
}
export type PropHandlerSetGenerator = (wgt: BaseWgt, path: string, index: number, value: any) => PropHandlerSet;
export type PropHandlerGenerator = (wgt: BaseWgt, path: string, key: string, value: any) => IPropertyHandler;
export interface CardPropControlOptions {
    /** Handler for the inner properties */
    propertyHandler?: PropHandlerSet | PropHandlerSetGenerator;
    /** Field of the inner objects to used as title  */
    titleField?: string;
    showDragHandler?: boolean;
    showRemoveButton?: boolean;
    showContent?: boolean;
    showAddButton?: boolean;
    useValueWithAttachEnabled?: boolean;
    maxItems?: number;
}
export interface FlatCardPropControlOptions {
    /** Handler for the inner properties */
    propertyHandler?: IPropertyHandler | PropHandlerGenerator;
}
export type PropControlOptions = ArbitraryPropControlOptions | InputPropControlOptions | DatalinkPropControlOptions | FormulaPropControlOptions | CardPropControlOptions | FlatCardPropControlOptions;
export interface IPropHandlerSelectOption {
    value: any;
    display: string;
}
export type IPropHandlerType = "string" | "numeric" | "boolean" | "object" | "model" | "color" | "date" | "datetime" | "select" | "array" | "select-icon" | "string-textarea" | "datasource" | "async-model" | "action" | "range" | "group-of-properties";
export default interface IPropertyHandler {
    /** Container layer in the property panel. Commonly used layers are "attributes" (the first one by default), "Style"  */
    layer?: string;
    /** Used to relatively sort the properties (and respective layers). The 'attributes" layers is forced as first layer */
    priority?: number;
    /** The type of the property passed to the propcontrol */
    type: IPropHandlerType;
    /** Format for type (for example # for numeric) */
    format?: string;
    /**  Edit multi-language property in Property Panel */
    supportI18n?: boolean;
    /** Key values used for select type */
    options?: IPropHandlerSelectOption[];
    /** Properties to pass to the prop control (e.g. visible, maxLength, ...) */
    /** The name of the graphical component used to handle this property */
    propControlOptions?: PropControlOptions;
    propControl?: string;
    readOnly?: boolean;
    /** Allow to attach tag. The propControl in this case will be replaced by a DatalinkPropControl or FormulaPropControl when datalink is actually attached to the property */
    attachTag?: boolean;
    /** Allow to drive read/write radio button visibility for DatalinkPropControl*/
    attachTagPermission?: "read" | "write" | "readwrite";
    /** Text to show in the properties panel */
    display?: string;
    /** Tooltip */
    description?: string;
    /** If set to true will look for all properties matching the property name + _options */
    dynamicOptions?: boolean;
    /** The property is actually an alias for a subproperty, where the subproperty is listed as alias */
    alias?: string[];
    /** Property "prop" must match value to hide this control */
    hideConditions?: {
        [prop: string]: any;
    };
    /** Property "prop" must match value to show this control */
    showConditions?: {
        [prop: string]: any;
    };
    showContext?: ShowPropContext;
    /** The property is exposed in the project tree */
    exposed?: boolean;
    /** The property is used to drive the visibility of the property */
    helpReference?: string;
}
export type IAsyncModelProperty = IPropertyHandler & {
    id: string;
    children?: IAsyncModelProperty[];
};
import { TagDataType } from "@/utils/Tag";
export declare function mapPropTypeToTagDataType(type: IPropHandlerType): TagDataType;
