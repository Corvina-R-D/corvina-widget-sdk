import { FlowDTO, DashboardEntryDTO, CardStyle } from "@/interfaces/flows";
export default class DashboardsFlow implements FlowDTO {
    id: string;
    name: string;
    description: string;
    realmId: string;
    orgResourceId: string;
    owner: string;
    readers: string[];
    editors: string[];
    creationDate: number;
    updatedAt: number;
    deleted: boolean;
    children: Array<DashboardEntryDTO>;
    cardStyle: CardStyle;
    private constructor();
    static from(flowLikeObject: any): DashboardsFlow;
    private static formatChildren;
}
