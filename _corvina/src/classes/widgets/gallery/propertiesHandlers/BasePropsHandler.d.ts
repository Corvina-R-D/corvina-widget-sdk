import IPropertyHandler, { IAsyncModelProperty } from "./IPropertyHandler";
import { BaseWgt } from "@/corvina-module";
export default class BasePropsHandler {
    id: IPropertyHandler;
    name: IPropertyHandler;
    private args;
    constructor(propHandlers?: object, createBaseProps?: boolean, setDefaultAttributes?: boolean, readOnlyId?: boolean);
    update(): this;
    protected setDefaultAttributes(readOnlyId?: boolean): void;
    private generatePropsHandler;
    protected createCustomPropsHandler(propertyHandlers?: any): void;
    /** Optionally returns additional indicators (icon+tooltip) to show in the project tree for this wgt */
    getIndicators(wgt: BaseWgt): {
        icon: string;
        tooltip: string;
    }[];
    /** Optionally returns additional indicators (icon+tooltip) for each widget property to show in the project tree for this wgt.prop */
    getPropertyIndicators(wgt: BaseWgt, prop: string): {
        icon?: string;
        badgeIcon?: string;
        tooltip: string;
    }[];
    fetchAsyncModelProperties(wgt: BaseWgt, prop: string): Promise<IAsyncModelProperty[]>;
}
