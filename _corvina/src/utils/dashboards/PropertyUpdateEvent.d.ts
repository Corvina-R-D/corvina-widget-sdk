import { BaseWgt } from "@/corvina-model";
export interface IPropertyEventDetail {
    name: string;
    value: any;
    widget?: BaseWgt;
    previousValue?: any;
}
export default function PropertyUpdatedEvent(property: IPropertyEventDetail): CustomEvent<IPropertyEventDetail>;
