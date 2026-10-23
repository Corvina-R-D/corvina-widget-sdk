/**
 * Metadata information for a property in the data model.
 */
export interface PropertyMetaInfo {
    /**
     * The data type of a corvina model property
     */
    type: string;
    /**
     * The version of the data model property
     */
    version: string;
    /**
     * Optional additional metadata
     */
    label?: string;
    description?: string;
    unit?: string;
    formula?: string;
    index?: number;
}
export interface DataModelDeviceSlot {
    [propertyName: string]: PropertyMetaInfo & {
        properties?: DataModelDeviceSlot;
    };
}
/**
 * Represents a single node in the Data Model tree.
 * A node can be:
 * 1. **A Leaf**: Contains a primitive value (type is 'integer', etc.)
 * 2. **A Branch**: Acts as a container (type is 'object' or 'struct') and contains nested `properties`.
 */
export interface DataModelNode extends PropertyMetaInfo {
    properties?: DataModelTree;
}
/**
 * A dictionary/map of DataModelNodes keyed by their property name.
 * * @example
 * ```typescript
 * const sensors: DataModelTree = {
 * "slot-1": { type: "object", version: "1", properties: { prop1: { type: "integer", version: "1" } } },
 * "slot-2": { type: "object", version: "1", properties: { prop1: { type: "string", version: "1" } } },
 * };
 * ```
 */
export interface DataModelTree {
    [propertyName: string]: DataModelNode;
}
/**
 * A flexible union type representing either a specific data node or an entire tree.
 * Used primarily as an input for utility functions that traverse the model.
 */
export type DataModelSource = DataModelNode | DataModelTree;
export declare function visitNodesFromTagName({ tree, tagName, notFoundCallback, nodeCallback, finalNodeCallback }: {
    tree: DataModelDeviceSlot;
    tagName: string;
    notFoundCallback?: () => void;
    nodeCallback?: (node: DataModelDeviceSlot, name: string) => void;
    finalNodeCallback?: (node: DataModelDeviceSlot, name: string) => void;
}): void;
export declare function traverse(tree: DataModelDeviceSlot, callbacks: {
    nodeCallback?: (node: any, name: string, path: string) => void;
    leafCallback?: (node: any, name: string, path: string) => void;
}, currentPath?: string): void;
