export declare enum TagDataType {
    DOUBLE = "double",
    DOUBLEARRAY = "doublearray",
    FLOAT = "float",
    FLOATARRAY = "floatarray",
    INTEGER = "integer",
    INTEGERARRAY = "integerarray",
    LONGINTEGER = "longinteger",
    LONGINTEGERARRAY = "longintegerarray",
    STRING = "string",
    STRINGARRAY = "stringarray",
    BOOLEAN = "boolean",
    BOOLEANARRAY = "booleanarray",
    BINARYBLOB = "binaryblob",
    BINARYBLOBARRAY = "binaryblobarray",
    DATETIME = "datetime",
    DATETIMEARRAY = "datetimearray",
    OBJECT = "object",
    STRUCT = "struct",
    OBJECTARRAY = "objectarray",
    STRUCTARRAY = "structarray",
    DEVICESLOT = "deviceslot",
    DATASOURCE_OBJECT_TIMESERIES = "datasource-object-timeseries",
    DATASOURCE_TIMESERIES = "datasource-timeseries",
    DATASOURCE_OBJECT_SCALAR = "datasource-object-scalar",
    DATASOURCE_SCALAR = "datasource-scalar",
    ARRAY = "array",
    UNKNOWN = "unknown",
    ASYNC_MODEL = "async-model",
    MODEL = "model",
    ACTION = "action"
}
export default class TagValue {
    static isSupportedType(type: string): boolean;
    static isSimpleType(type: string): boolean;
    static isNumericType(type: string): boolean;
    static isArray(type: string): boolean;
    static makeValue(type: string): false | "" | 0 | Date;
    static cast(value: any, type: string): any;
    static getInvalidValue(value: any): any;
    static getTypeFromValue(value: any): TagDataType;
}
