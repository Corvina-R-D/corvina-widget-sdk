/*
 * lit-html is not required by Corvina: this example needs it installed in the project
 *   yarn add lit-html
 * and it is bundled into the widget package.
 */
import { html, render } from "lit-html";
import { BaseGraphicWgt, IRenderableWidget, Value, WidgetRenderer } from "corvina";
import { widgetType } from "./defs";

/*
 * The widget of MyRenderWidget written with lit-html.
 * render() returns a template, the static renderer commits it into root updating only the changed parts.
 * Any other library works the same way, e.g. preact: `static renderer = ( vnode, root ) => preactRender( vnode, root )`
 */
export default class MyLitWidget extends BaseGraphicWgt implements IRenderableWidget {
  // `host` binds `this` of the template event listeners to the widget
  static renderer: WidgetRenderer = ( template, root, widget ) => render( template, root, { host: widget } );

  static styles = `
    .my-lit-widget { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; height: 100%; }
    .my-lit-widget h2 { margin: 0; }
    .my-lit-widget .bar { width: 80%; height: 8px; border-radius: 4px; background: #e0e0e0; overflow: hidden; }
    .my-lit-widget .bar-fill { height: 100%; background: var(--color-primary, #1976d2); transition: width .3s; }
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

  render() {
    const value = Number( this.linkableProp.unwrap() ) || 0;
    // lit-html escapes the values: no markup injection from datalinks
    return html`
      <div class="my-lit-widget">
        <h2>${this.message.unwrap()}: ${value}</h2>
        <div class="bar"><div class="bar-fill" style="width: ${Math.min( Math.max( value, 0 ), 100 )}%"></div></div>
        <button @click=${this.increment}>Clicks: ${this.clicks}</button>
      </div>`;
  }

  increment() {
    this.clicks++;
    this.requestUpdate();
  }

  serialize() {
    let serializedWgt = super.serialize();
    serializedWgt.message = this.message.v;
    serializedWgt.linkableProp = this.linkableProp.v;
    return serializedWgt;
  }
}
