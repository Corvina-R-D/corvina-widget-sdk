export default class DeviceFormatter {
    static formatLatLongToNumber(devices: any): void;
    static addLabelToDevice(devices: any): void;
    static addLabelToCorvinaDevice(devices: any): void;
    static formatGroupName(deviceGroupName: any): any;
    static formatCreateDeviceGroupData(deviceGroup: any, deviceGroupName: any): {
        name: any;
        parentId: any;
    };
    static formatUpdateDeviceGroupData(deviceGroup: any, deviceGroupName: any): {
        name: any;
    };
    static formatUpdatedDeviceGroupNode(node: any, updatedNode: any): void;
    static setDeviceNodeFields(node: any, parentNode: any): void;
    static setDeviceGroupNodeFields(node: any, parentNode: any): void;
    static isDeviceLabelValid(label: string): boolean | string;
}
