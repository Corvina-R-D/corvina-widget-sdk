/**
 * The tag references the dashboard resolves before it sends a query map to platform-api: $("name"), $('name') or
 * $(name), whose name is made of letters, digits and \ : - + / *
 */
export declare const TagReferencePattern: RegExp;
export interface ITagReference {
    /** offsets of the whole $(...) in the formula */
    start: number;
    end: number;
    /** the dashboard tag name */
    name: string;
}
/** The tag references of the formula, in order */
export declare function tagReferences(formula: string): ITagReference[];
/**
 * The platform name (deviceId/modelPath) of a dashboard tag name; undefined when the tag has no device, or is not
 * known
 */
export type PlatformTagName = (name: string) => string | undefined;
/**
 * Replaces every tag reference with the platform name of its tag, as the query sent to platform-api names it.
 * Throws when a tag has no platform name: the query cannot be sent.
 */
export declare function resolveTagReferences(formula: string, platformTagName: PlatformTagName): string;
