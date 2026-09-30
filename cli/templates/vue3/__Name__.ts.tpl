import { App, createApp, h, shallowReactive } from "vue3";
import { BaseGraphicWgt, IRenderableWidget, Value, useCorvinaI18n } from "corvina";
import { widgetType } from "./defs";
import __Name__View, { __Name__ViewProps } from "./__Name__View";

const i18n = useCorvinaI18n({
  "en-US": { "clicks": "Clicks" },
  "it-IT": { "clicks": "Click" }
});

interface MountedView {
  app: App;
  props: __Name__ViewProps;
}

// The Vue 3 apps are kept out of the widgets: widgets live in the dashboard store, observed deeply by Vue 2
const views = new WeakMap<HTMLElement, MountedView>();

/*
 * A widget drawn with Vue 3 (see doc/widgets_without_vue.md).
 * Vue 3 is the package "vue3", an alias of vue@3: "vue" is the Vue 2 of Corvina.
 * Every widget mounts its own Vue 3 app into root on the first render, the following renders copy the
 * widget properties into the reactive props of the app and Vue 3 updates the view.
 * The Vue 3 component is in __Name__View.ts.
 */
export default class __Name__ extends BaseGraphicWgt implements IRenderableWidget {
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
  render( root: HTMLElement ) {
    // Plain values, not the widget: the widget is already observed by Vue 2
    const props: __Name__ViewProps = {
      message: this.message.unwrap(),
      value: Number( this.value.unwrap() ) || 0,
      clicksLabel: String( i18n.t( "clicks" ) )
    };

    const view = views.get( root );
    if ( view ) {
      Object.assign( view.props, props );
      return;
    }
    const reactiveProps = shallowReactive( props );
    const app = createApp( { render: () => h( __Name__View, { ...reactiveProps } ) } );
    app.mount( root );
    views.set( root, { app, props: reactiveProps } );
  }

  // Called once, before root is removed
  onUnmount( root: HTMLElement ) {
    views.get( root )?.app.unmount();
    views.delete( root );
  }

  serialize() {
    let serializedWgt = super.serialize();
    serializedWgt.message = this.message.v;
    serializedWgt.value = this.value.v;
    return serializedWgt;
  }
}
