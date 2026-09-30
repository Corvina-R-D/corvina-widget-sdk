import { createElement, ReactElement } from "react";
import { createRoot, Root } from "react-dom/client";
import { BaseGraphicWgt, IRenderableWidget, Value, WidgetRenderer, useCorvinaI18n } from "corvina";
import { widgetType } from "./defs";
import __Name__View from "./__Name__View";

const i18n = useCorvinaI18n({
  "en-US": { "clicks": "Clicks" },
  "it-IT": { "clicks": "Click" }
});

// The React roots are kept out of the widgets: widgets live in the dashboard store, observed deeply by Vue 2
const reactRoots = new WeakMap<HTMLElement, Root>();

/*
 * A widget drawn with React (see doc/widgets_without_vue.md).
 * render() returns a React element with the widget properties, the static renderer commits it into the
 * React root of the widget, created on the first render. The React component is in __Name__View.tsx.
 */
export default class __Name__ extends BaseGraphicWgt implements IRenderableWidget {
  static renderer: WidgetRenderer = ( element, root ) => {
    let reactRoot = reactRoots.get( root );
    if ( !reactRoot ) {
      reactRoot = createRoot( root );
      reactRoots.set( root, reactRoot );
    }
    reactRoot.render( element as ReactElement );
  };

  // Scoped by Corvina to the widgets of this type: no selector can reach the rest of the page (doc/widgets_without_vue.md)
  static styles = `
    .__cssClass__ { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; height: 100%; }
    .__cssClass__ h2 { margin: 0; }
    .__cssClass__ .bar { width: 80%; height: 8px; border-radius: 4px; background: #e0e0e0; overflow: hidden; }
    .__cssClass__ .bar-fill { height: 100%; background: var(--color-primary, #1976d2); transition: width .3s; }
  `;

  message: Value<string>;
  value: Value<number>;

  constructor( args ) {
    super( args );
    this.type = widgetType;
    this.message = new Value( args.initState.message ?? "__title__" );
    this.value = new Value( args.initState.value ?? 50 );
  }

  // Called on every change: widget properties (datalinks, editor), size, language, requestUpdate()
  render() {
    // Plain values, not the widget: React compares the props to decide what to update
    return createElement( __Name__View, {
      message: this.message.unwrap(),
      value: Number( this.value.unwrap() ) || 0,
      clicksLabel: String( i18n.t( "clicks" ) )
    } );
  }

  // Called once, before root is removed
  onUnmount( root: HTMLElement ) {
    reactRoots.get( root )?.unmount();
    reactRoots.delete( root );
  }

  serialize() {
    let serializedWgt = super.serialize();
    serializedWgt.message = this.message.v;
    serializedWgt.value = this.value.v;
    return serializedWgt;
  }
}
