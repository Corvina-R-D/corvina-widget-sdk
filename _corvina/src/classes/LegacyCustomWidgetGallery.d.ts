import { BaseGallery, BasePropsHandler } from "@/corvina-model";
export interface SerializedProp {
    attr: string;
    type: string;
    default: any;
    description: string;
    layer: string;
    attachable: boolean;
    control: string;
}
export default class LegacyCustomWidgetGallery extends BaseGallery {
    private formattedProps;
    private configuration;
    constructor(instance: any, props: SerializedProp);
    setPropertyControl(name: string, control: string): void;
    getPropsHandler(): BasePropsHandler;
    setCongiguration(conf: any): void;
    getDefaultConfiguration(): () => any;
}
