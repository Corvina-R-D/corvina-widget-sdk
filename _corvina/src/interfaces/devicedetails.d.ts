import { TypedObject } from "./utils";
export interface DeviceDetails {
    id: string;
    connected: boolean;
    aliases: TypedObject<string>;
    attributes: TypedObject<string>;
}
