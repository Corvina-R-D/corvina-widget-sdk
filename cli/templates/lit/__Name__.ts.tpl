import { html, render } from "lit-html";
import { BaseGraphicWgt, IRenderableWidget, Value, WidgetRenderer, useCorvinaI18n } from "corvina";
import { widgetType } from "./defs";

const i18n = useCorvinaI18n({
  "en-US": { "clicks": "Clicks" },
  "it-IT": { "clicks": "Click" }
});

/*
 * A widget drawn with lit-html (see doc/widgets_without_vue.md).
 * render() returns a template, the static renderer commits it into root updating only the changed parts.
 */
export default class __Name__ extends BaseGraphicWgt implements IRenderableWidget {
  // `host` binds `this` of the template event listeners to the widget
  static renderer: WidgetRenderer = ( template, root, widget ) => render( template, root, { host: widget } );

  // Scoped by Corvina to the widgets of this type: no selector can reach the rest of the page (doc/widgets_without_vue.md)
  static styles = `
    .__cssClass__ { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; height: 100%; }
    .__cssClass__ h2 { margin: 0; }
    .__cssClass__ .bar { width: 80%; height: 8px; border-radius: 4px; background: #e0e0e0; overflow: hidden; }
    .__cssClass__ .bar-fill { height: 100%; background: var(--color-primary, #1976d2); transition: width .3s; }
  `;

  message: Value<string>;
  value: Value<number>;
  // Internal state is not a widget property: after changing it call requestUpdate()
  private clicks: number;

  constructor( args ) {
    super( args );
    this.type = widgetType;
    this.message = new Value( args.initState.message ?? "__title__" );
    this.value = new Value( args.initState.value ?? 50 );
    this.clicks = 0;
  }

  render() {
    const value = Number( this.value.unwrap() ) || 0;
    // lit-html escapes the values: no markup injection from datalinks
    return html`
      <div class="__cssClass__">
        <h2>${this.message.unwrap()}: ${value}</h2>
        <div class="bar"><div class="bar-fill" style="width: ${Math.min( Math.max( value, 0 ), 100 )}%"></div></div>
        <button @click=${this.increment}>${i18n.t( "clicks" )}: ${this.clicks}</button>
      </div>`;
  }

  increment() {
    this.clicks++;
    this.requestUpdate();
  }

  serialize() {
    let serializedWgt = super.serialize();
    serializedWgt.message = this.message.v;
    serializedWgt.value = this.value.v;
    return serializedWgt;
  }
}
