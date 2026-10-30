# Help of the widgets

A widget can bring its own help: the pages the dashboard editor shows from the help button of the
widget's properties. They are written in Markdown, one folder per language, next to the widget, and
compiled into the package when it is built: nothing else is uploaded.

See the example `src/examples/MyWidget/docs`, registered in `src/main.ts`.

## Pages

```
src/examples/MyWidget/
  docs/
    en/
      overview.md
      properties.md
    it/
      overview.md
      properties.md
```

- **Languages**: the folders are the languages of Corvina, with the region (`en-US`, `it-IT`, `de-DE`,
  `fr-FR`, `es-ES`, `ja-JP`) or without (`en`, `it`, …). The editor looks for a page in the language of
  the user, then without the region, then in `en-US` and in `en`: a page written in english only is
  shown in every language.
- **Links**: a page links another one of the same widget as `properties.md`, or `properties.md#message`
  for a heading of it. Every heading has an id made of its text: lowercase, spaces as `-`, no
  punctuation (`## Linkable Prop` → `#linkable-prop`). The help panel follows these links without
  leaving the panel, and has a back button. A link to another site opens in a new tab.
- **Images**: use the Markdown syntax with a path relative to the page,
  `![Gauge](../img/gauge.png)`. The image is packaged with the widget like its other resources, so add
  its file name to `resources.images` of `src/manifest.json`, and keep the name unique in the package
  (the build warns when it is not listed). `<img>` tags written in the page are not packaged: use them
  only for absolute URLs.
- **Html**: the editor cleans the pages before showing them: no scripts, event handlers, iframes,
  `<style>` or forms.

## Registration

`widgetHelp` (`src/help.ts`) turns the pages into the `help` of the widget:

```typescript
import { widgetHelp } from "./help";

registerWidget({
  type: MyWidgetType,
  // …
  // one page (docs/<locale>/<any name>.md)
  help: widgetHelp( require.context( "./examples/MyWidget/docs", true, /\.md$/ ) ),
}, manifest);
```

With more pages, name the one the help opens on:

```typescript
help: widgetHelp( require.context( "./examples/MyWidget/docs", true, /\.md$/ ), {
  home: "overview",
  // optional: tabs above the pages (label: a translation key or the text), pages that need a wide panel
  tabs: [ { doc: "overview", label: "Guide" }, { doc: "properties", label: "Properties" } ],
  wide: [],
} )
```

`require.context` takes literal arguments only, so each widget calls it with its own folder.

## When the help is shown

Corvina has its own documentation for some widget types, written for each brand: for those types the
editor shows Corvina's, never the widget's. The help of an SDK widget, whose type is prefixed with the
package name (`org.MyWidget`), is always its own.
