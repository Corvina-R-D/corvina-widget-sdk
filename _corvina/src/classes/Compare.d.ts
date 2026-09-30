interface Compare<T> {
    equals(object: Compareable<T>): boolean;
}
export default abstract class Compareable<T> implements Compare<T> {
    equals(object: Compareable<T>): boolean;
}
export {};
