import { DeviceIn, GeoBounds } from "../interfaces/device";
declare const _default: {
    getDevices(state: any): Array<DeviceIn>;
    getCorvinaDevices(state: any): any;
    getDeviceById(state: any): (deviceId: string) => DeviceIn;
    getDeviceByLabel(state: any): (deviceLabel: string) => DeviceIn;
    getDeviceListPagination(state: any): any;
    getDevice(state: any): DeviceIn;
    getDevicesGeoBounds(state: any): GeoBounds;
    getTags(state: any): any;
    getDeviceGroups(state: any): any;
    getDeviceDetailsModalOpen(state: any): any;
    getDeviceDetailsModalBusy(state: any): any;
    getWSError(state: any): any;
};
export default _default;
