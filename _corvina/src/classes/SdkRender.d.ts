/**
 * Framework-agnostic rendering of SDK widgets.
 *
 * An SDK widget can be registered without a Vue component: its class draws itself through
 * `render(root)` and the dashboard mounts it with the generic SdkRenderHost component.
 * The contract does not depend on any UI library, `render(root)` can:
 *   - draw directly into `root` and return nothing (DOM API, canvas, plotly, d3, ...);
 *   - return a DOM `Node`, that is placed into `root`;
 *   - return any other value (lit-html template, preact vnode, ...), committed into `root`
 *     by the `static renderer` declared by the widget class.
 *
 * The render state is kept here, outside the widget instance: widgets live in the Vuex store,
 * anything stored on them becomes deeply reactive.
 */
import type BaseGraphicWgt from "./BaseGraphicWgt";
export interface WidgetRenderSize {
    width: number;
    height: number;
}
/**
 * Hooks implemented by an SDK widget class that renders itself without a Vue component.
 * Lifecycle: onMount -> render -> ( onResize | render )* -> onUnmount
 */
export interface IRenderableWidget {
    /** Draws the widget content into root. Called again on every update, it must be idempotent */
    render(root: HTMLElement): unknown;
    /** Called once, when root is attached to the document and before the first render */
    onMount?(root: HTMLElement): void;
    /** Called when the size of root changes, before the render that follows */
    onResize?(size: WidgetRenderSize, root: HTMLElement): void;
    /** Called once, before root is removed: release timers, listeners and library instances here */
    onUnmount?(root: HTMLElement): void;
}
/** Commits into root a value returned by render(), e.g. `( tpl, root, wgt ) => litRender( tpl, root, { host: wgt } )` */
export type WidgetRenderer = (result: unknown, root: HTMLElement, widget: BaseGraphicWgt) => void;
/** CSS text, or an object exposing it as cssText (e.g. the result of lit `css`) */
export type WidgetStyle = string | {
    cssText: string;
};
export type WidgetStyles = WidgetStyle | WidgetStyle[];
/** Static members of a widget class rendering itself, all optional */
export interface IRenderableWidgetClass {
    /** Commits into root the value returned by render(): needed when it is not a DOM Node */
    renderer?: WidgetRenderer;
    /** CSS of the widget: it applies only inside the widgets of the type (see applyWidgetStyles) */
    styles?: WidgetStyles;
    /**
     * CSS added to the document as it is, for what the widget places outside its root
     * (e.g. popups appended to document.body): its selectors have to be prefixed by hand
     */
    globalStyles?: WidgetStyles;
    /**
     * Renders the widget into a shadow root, with its styles: the CSS of the page does not reach the
     * widget (inherited properties and CSS variables of the theme do), the CSS of the widget does not leave it
     */
    shadow?: boolean;
}
export interface RenderHost {
    commit(): void;
}
export declare function isRenderableWidgetClass(widgetClass: any): boolean;
export declare function attachRenderHost(widget: object, host: RenderHost): void;
export declare function detachRenderHost(widget: object, host: RenderHost): void;
/**
 * Schedules a render of the widget in every host that mounts it.
 * Requests are batched: all the updates of the same task (e.g. the datalinks initialization)
 * produce one render. It is a no-op for widgets that are not mounted by a render host.
 */
export declare function scheduleRender(widget: object): void;
/** Places into root the value returned by render() */
export declare function commitRenderResult(widget: BaseGraphicWgt, root: HTMLElement, result: unknown): void;
/** Attribute of the host element of an SDK widget, set to the widget type (see SdkRenderHost) */
export declare const WIDGET_TYPE_ATTRIBUTE = "data-sdk-widget";
/** Selector of the host elements of the widgets of a type: the scope of their styles */
export declare function widgetScope(widgetType: string): string;
/**
 * Adds to the document the styles of a widget class, once per widget type:
 * - `static styles` scoped to the widgets of the type, their selectors prefixed by widgetScope(type):
 *   they cannot style the rest of the page, whatever the selectors (`h2`, `button`, `:root`, ...);
 *   with `static shadow` they go into the shadow roots instead (see createRenderRoot);
 * - `static globalStyles` as they are.
 */
export declare function applyWidgetStyles(widgetType: string, widgetClass: unknown): void;
/**
 * Returns the element a widget renders into, host or, with `static shadow`, an element in a shadow
 * root of host with the `static styles` of the widget. The widgets of a type share one style sheet,
 * replaced when the styles change (e.g. hot reload).
 */
export declare function createRenderRoot(host: HTMLElement, widgetType: string, widgetClass: unknown): HTMLElement;
