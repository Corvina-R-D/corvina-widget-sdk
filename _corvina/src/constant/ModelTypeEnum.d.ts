declare enum ModelTypeEnum {
    INTEGER = "integer",
    STRING = "string",
    DOUBLE = "double",
    BOOLEAN = "boolean",
    ARRAY = "array",
    OBJECT = "object",
    STRUCT = "struct",
    INTEGERARRAY = "integerarray",
    DOUBLEARRAY = "doublearray",
    BOOLEANARRAY = "booleanarray",
    BINARYBLOB = "binaryblob"
}
import { IPropHandlerType } from '@/classes/widgets/gallery/propertiesHandlers/IPropertyHandler';
export declare function modelTypeToInputPropControlType(type: ModelTypeEnum): IPropHandlerType;
/*! ]
 * @param type is the given model type
 * @param value is either an object name or an object content in case of existing objects
 * @param number is array length
 */
export declare function getModelPropertyFromType(type: ModelTypeEnum, value: any, number?: any): any;
export default ModelTypeEnum;
