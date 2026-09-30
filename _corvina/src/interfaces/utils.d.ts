export type TypedObject<T> = {
    [key: string]: T;
};
export interface ParsedData {
    subject: string;
    action: string;
}
