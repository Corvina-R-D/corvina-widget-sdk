import BaseWgt from "../BaseWgt";
import { FactoryPropertyDataDefinition, PropertyDataDefinition } from "../WidgetFactory";
import { DataModelTree, DataModelSource, PropertyMetaInfo } from '@/utils/dashboardDeviceModel';
export interface IPropertyInfo {
    modelPath: string;
    formula?: string;
    index?: number;
}
export declare function tagPathToPropertyPath(tagName: string, property: string): string;
export declare function waitForPromises(promises: Promise<Promise<void>[]>[]): Promise<void>;
export default class ModelUtility {
    private static getPropertyType;
    private static filterByPropertyName;
    private static filterByPropertyType;
    private static applyDatalinkFactoryFilter;
    static applyDatalinkFactoryPolicy(factory: Array<{
        type: string;
        properties: string[] | Array<{
            name: string;
            index?: number;
        }>;
        policy?: string;
    }>, widget: BaseWgt): void;
    static applyFiltersToWidgetModel(widget: BaseWgt, model: DataModelTree | "None", links: PropertyDataDefinition["links"], filters: BaseWgt[]): Promise<Promise<void>[]>[];
    private static createWidgetFromDefinition;
    private static createDataLink;
    private static createFormula;
    private static setupWidgetProperties;
    private static setupAdditionalLinks;
    /**
     * Dynamically generates child widgets and establishes data bindings based on a model source.
     * This function automates the "Model-to-View" mapping.
     *
     * It iterates through a list of data properties (models) and, for each property, creates
     * the widgets defined in the factory configuration.
     *
     * It handles both direct Tag links and complex Formulas.
     *
     * @param factory - Definitions for widget creation.
     * - `type`: The widget class to instantiate (e.g., 'DatasetWgt').
     * - `properties`: Widget properties that will be bound to the model path.
     * - `policy`: If set to 'clear', existing children of `type` are removed first.
     *             If 'add', new widgets are simply added.
     * @param widget - The parent UI widget component.
     * @param models - The data source. If an Object is passed, it is filtered by `matches`.
     * @param save - Whether to trigger a project save after creation.
     * @param matches - Regex array used to filter model paths when `models` is an Object.
     * @returns A promise that resolves when all widgets and links are successfully created.
     *
     * @example
     * // Example of a factory configuration:
     * const factoryConfig = [
     *   {
     *     policy: "clear", // Policies can be "clear" or "add." The policy "clear" will remove existing widgets of the same type before adding new ones. The policy "add" will simply add new widgets without removing existing ones.
     *     type: "DatasetWgt", // The type of widget to create.
     *     properties: ["value"], // Properties of the new widget to link to the data source.
     *     additionalLinks: [{ // Optional additional links for the new widget.
     *       sourceProp: "label",
     *       targetProp: "label",
     *       perm: 'r'
     *     }]
     *   }
     * ];
     */
    static runDataLinkFactory(factory: Array<FactoryPropertyDataDefinition>, widget: BaseWgt, models: DataModelTree | Array<IPropertyInfo>, save?: boolean, matches?: RegExp[]): Promise<Promise<void>[]>;
    static getFullModelPath(model: any, name?: string, path?: string): string;
    static listTagsFromModel(models: DataModelSource): IPropertyInfo[];
    static listTagInfoFromModel(models: any, addRoot?: boolean, level?: number): Array<[string, PropertyMetaInfo]>;
    static commonTagPrefix(list: string[]): string;
    static getTagPropertyChain(tagName: string, property: string): string;
}
