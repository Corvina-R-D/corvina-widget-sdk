export interface IFlowDeviceSlotStorage {
    deviceId: string;
    model: string;
    name: string;
}
export interface IFlowStorage {
    flowID: string;
    deviceSlots: IFlowDeviceSlotStorage[];
    lastUpdate: number;
}
declare function getDeviceSlotArray(): IFlowStorage[];
declare function searchFlow(id: string): IFlowStorage;
declare function getFlow(deviceSlotArray: IFlowStorage[], id: string): IFlowStorage;
declare function removeFlow(flowID: string): void;
declare function addDeviceSlotArray(flowID: string, deviceSlots: IFlowDeviceSlotStorage[]): void;
export declare const useFlowLocalStorage: () => {
    getDeviceSlotArray: typeof getDeviceSlotArray;
    addDeviceSlotArray: typeof addDeviceSlotArray;
    getFlow: typeof getFlow;
    removeFlow: typeof removeFlow;
    searchFlow: typeof searchFlow;
};
export {};
