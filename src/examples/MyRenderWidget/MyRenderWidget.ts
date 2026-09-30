declare var adjustPath;
import { BaseGraphicWgt, IRenderableWidget, Value, useCorvinaI18n } from "corvina";
import { widgetType } from "./defs";

const iconPath = require( "../../resources/images/corvina-widget1.png" );
const i18n = useCorvinaI18n({
  "en-US": { "title": "My Render Widget", "clicks": "Clicks" },
  "it-IT": { "title": "Il mio Render Widget", "clicks": "Click" }
});

/*
 * A widget without Vue component and without UI libraries: it draws itself with the DOM API.
 * The DOM skeleton is created once in onMount, render() updates only the values.
 * It is registered without the `component` field (see main.ts).
 */
export default class MyRenderWidget extends BaseGraphicWgt implements IRenderableWidget {
  // Scoped by Corvina to the widgets of this type: no selector can reach the rest of the page (doc/widgets_without_vue.md)
  static styles = `
    .my-render-widget { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; height: 100%; }
    .my-render-widget h1, .my-render-widget h2 { margin: 0; }
    .my-render-widget .bar { width: 80%; height: 8px; border-radius: 4px; background: #e0e0e0; overflow: hidden; }
    .my-render-widget .bar-fill { height: 100%; background: var(--color-primary, #1976d2); transition: width .3s; }
    .my-render-widget .icon { width: 40px; height: 40px; }
  `;

  message: Value<string>;
  linkableProp: Value<number>;
  // Internal state is not a widget property: after changing it call requestUpdate()
  private clicks: number;

  constructor( args ) {
    super( args );
    this.type = widgetType;
    this.message = new Value( args.initState.message );
    this.linkableProp = new Value( args.initState.linkableProp );
    this.clicks = 0;
  }

  // Called once, before the first render
  onMount( root: HTMLElement ) {
    // Static markup only: the values are always assigned as text in render()
    root.innerHTML = `
      <div class="my-render-widget">
        <h1 data-ref="title"></h1>
        <h2><span data-ref="message"></span>: <span data-ref="value"></span></h2>
        <div class="bar"><div class="bar-fill" data-ref="bar"></div></div>
        <button data-ref="clicks"></button>
        <img class="icon" data-ref="icon">
      </div>`;
    ( root.querySelector( "[data-ref=icon]" ) as HTMLImageElement ).src = adjustPath( iconPath );
    root.querySelector( "[data-ref=clicks]" ).addEventListener( "click", () => {
      this.clicks++;
      this.requestUpdate();
    } );
  }

  // Called after onMount and on every change: widget properties (datalinks, editor), size, language, requestUpdate()
  render( root: HTMLElement ) {
    const ref = ( name: string ) => root.querySelector( `[data-ref=${name}]` ) as HTMLElement;
    const value = Number( this.linkableProp.unwrap() ) || 0;

    ref( "title" ).textContent = String( i18n.t( "title" ) );
    ref( "message" ).textContent = this.message.unwrap();
    ref( "value" ).textContent = String( value );
    ref( "bar" ).style.width = `${Math.min( Math.max( value, 0 ), 100 )}%`;
    ref( "clicks" ).textContent = `${i18n.t( "clicks" )}: ${this.clicks}`;
  }

  // Called once, before root is removed: release here timers, subscriptions and library instances
  onUnmount() {}

  serialize() {
    let serializedWgt = super.serialize();
    serializedWgt.message = this.message.v;
    serializedWgt.linkableProp = this.linkableProp.v;
    return serializedWgt;
  }
}
