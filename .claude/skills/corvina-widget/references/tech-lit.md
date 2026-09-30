# Binding in a lit-html widget (`lit`)

The class implements `IRenderableWidget`: `render()` returns a lit-html template, the
`static renderer` commits it into `root` updating only the changed parts. Requires `lit-html`
(added by `corvina-sdk create widget lit`).

```typescript
import { html, render } from "lit-html";

export default class Tank extends BaseGraphicWgt implements IRenderableWidget {
  // `host` binds `this` of the template event listeners to the widget
  static renderer: WidgetRenderer = ( template, root, widget ) => render( template, root, { host: widget } );
  static styles = `.tank { ... } .tank .level { ... }`;

  render() {
    const level = Number( this.level.unwrap() ) || 0;
    return html`
      <div class="tank">
        <span class="label">${this.label.unwrap()}</span>
        <div class="level" style="height: ${level}%; background: ${this.fillColor.unwrap()}"></div>
        <button @click=${this.toggle} ?disabled=${!this.enabled.unwrap()}>...</button>
      </div>`;
  }
}
```

## Where each thing goes

| What | Where |
|---|---|
| Markup (from the HTML mockup) | the template returned by `render()` |
| Property values | `${this.prop.unwrap()}` in text, attributes and styles: lit-html escapes them |
| Boolean attributes | `?disabled=${...}`, `?hidden=${...}` |
| Events | `@click=${this.method}`: `this` is the widget thanks to `{ host: widget }` |
| CSS | `static styles` (string or lit `css`), scoped to the widget by Corvina: rules under the widget root class |

Never use `unsafeHTML` with property values. Internal state: a plain field, then `this.requestUpdate()`.

## Checklist
- [ ] every dynamic part of the mockup is an expression of the template
- [ ] no string concatenation to build markup
- [ ] event handlers are methods of the class (or arrow functions), bound through `host`
