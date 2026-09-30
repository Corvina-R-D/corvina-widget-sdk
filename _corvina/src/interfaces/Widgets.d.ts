export interface BaseObject {
    getPropertyValue: (prop: string) => any;
    setPropertyValue: (param: {
        prop: string;
        value: any;
    }) => void;
}
