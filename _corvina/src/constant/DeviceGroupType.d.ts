import { SecurityPolicyInDTO } from "@/interfaces/securitypolicy";
declare enum DeviceGroupType {
    SELF_DEVICE = "SELF_DEVICE",
    ALL_DEVICES = "ALL_DEVICES",
    STANDARD = "STANDARD",
    DEVICE_TEXT_FIELD = "DEVICE_TEXT_FIELD",
    DEVICE_GROUP_TEXT_FIELD = "DEVICE_GROUP_TEXT_FIELD",
    NO_DEVICES_PLACEHOLDER = "NO_DEVICES_PLACEHOLDER"
}
export declare function getIconDeviceGroup(item: SecurityPolicyInDTO): string;
export default DeviceGroupType;
