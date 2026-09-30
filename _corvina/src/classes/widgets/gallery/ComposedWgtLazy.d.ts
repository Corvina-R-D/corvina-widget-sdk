import BaseGallery from "./BaseGallery";
export default class ComposedWgtLazy {
    private static _composedWgtGallery;
    static getModule(): Promise<BaseGallery>;
}
