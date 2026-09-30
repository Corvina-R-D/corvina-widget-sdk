export declare enum WidgetGalleryDefaultCategories {
    CustomWidgets = "Custom",
    ComposedWidgets = "_COMPOSED_WIDGETS"
}
export declare class WidgetGalleryClass {
    private _widgetsByCategory;
    private _defaultCategory;
    get widgetsByCategory(): ICategoriesMap;
    get defaultCategory(): string;
    refresh(): void;
}
export declare let WidgetGallery: WidgetGalleryClass;
export interface ICategoriesMap {
    [categoryName: string]: any[];
}
