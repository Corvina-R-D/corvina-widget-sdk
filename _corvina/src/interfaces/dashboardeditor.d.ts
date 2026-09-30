export declare enum DragOverOperation {
    NONE = 0,
    DRAG_TAG_FROM_TREE = 1,
    DRAG_WIDGET_FROM_GALLERY = 2,
    DRAG_WIDGET_FROM_APP = 3
}
import IPropertyHandler from '@/classes/widgets/gallery/propertiesHandlers/IPropertyHandler';
import DeviceSlot from '@/classes/DeviceSlot';
import Value from '@/classes/Value';
export interface DeviceSlotExtended extends DeviceSlot {
    instanceOf?: string;
    propHandler?: IPropertyHandler;
    value?: Value<any>;
}
export type DeviceSlotExtendedMap = {
    [propName: string]: DeviceSlotExtended;
};
import { TagDataType } from '@/utils/Tag';
export declare enum ElementType {
    PROPERTY = 3
}
export interface DragTreePropertyEvent {
    wgtId: string;
    tagType: TagDataType;
    tagInstanceOf?: string;
    type: ElementType;
    propName: string;
    wgtID?: string;
}
