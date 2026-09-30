export interface FlowDTO {
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
}
export interface DashboardEntryDTO {
    _id: string;
    type: "dashboard" | "flow";
    alias: string | undefined;
    name: string;
    id: string;
    children: Array<DashboardEntryDTO>;
    style: {
        icon: string;
        set: string;
        color: string;
    };
}
export type FlagShape = "circle" | "square" | "triangle";
export interface CardStyle {
    flagShape: FlagShape;
    flagColor: string;
    backgroundColor: string;
    backgroundImage: string;
    iconSet: string;
    iconName: string;
    iconColor: string;
}
