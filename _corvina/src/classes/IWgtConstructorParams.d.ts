import Value from "./Value";
export default interface IWgtConstructorParams<T> {
    id: string | Value<string>;
    name: string;
    class?: string;
    type?: string;
    parent?: any;
    initState?: T;
    page?: any;
    isLoading?: boolean;
    preview?: boolean;
}
