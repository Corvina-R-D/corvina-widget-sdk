import ModelTypeEnum from "@/constant/ModelTypeEnum";
export interface ModelProperties {
    [name: string]: {
        type: string;
        version: string;
    };
}
type SimulationDescription = any;
interface DeviceSlotConstructor {
    name: string;
    model: string;
    deviceId?: string;
    modelName?: string;
    modelVersion?: string;
    properties?: ModelProperties;
    simulation?: any;
    deviceModelName?: string;
    deviceIntermediatePath?: string;
    type?: ModelTypeEnum;
    clocks?: string[];
}
export default class DeviceSlot {
    type: ModelTypeEnum;
    name: string;
    model: string;
    deviceId: string;
    modelName: string;
    modelVersion: string;
    properties: ModelProperties;
    simulation: {
        [name: string]: SimulationDescription;
    };
    deviceModelName: string;
    deviceIntermediatePath: string;
    clocks: string[];
    constructor(args: DeviceSlotConstructor);
    get id(): string;
}
export {};
