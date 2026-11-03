# From a design to a widget: Figma, image, PDF

The design becomes an HTML mockup first, then a widget following [from-html.md](from-html.md). The
mockup is where the design is read once. The widget code is then written against the mockup, not
against the design.

## 1. Read the design

### Figma, through the Figma MCP server
- The Figma MCP server must be connected (`/mcp`). The user gives the link of the frame or component,
  or selects it in the Figma desktop app (local server). List the server's tools first: the names
  below are the current ones and change between versions.
- `get_metadata` on a large page: find the node of the widget, then work on that node only.
- `get_design_context` on the widget node gives its structure and styles as code (React + Tailwind
  by default; ask for plain HTML and CSS). It is a reference for sizes, colors and layout, not code
  to paste: Tailwind classes and absolute positions become CSS of the widget root (see from-html.md).
- `get_variable_defs` gives the colors, fonts and spacing of the design system. Colors that the user
  should be able to change become color properties with the variable value as default. Other values
  stay constants in the CSS, as CSS variables on the widget root.
- `get_screenshot` gives the reference for the visual check (step 4).
- Images and icons: the server returns them as local URLs. Download them into `src/resources/images`
  with unique names and list them in `src/manifest.json` (from-html.md, Resources). Simple icons are
  better as inline SVG: their colors can be bound to properties and they need no resource.
- Figma component properties map to widget properties:
  - a variant (`State=On/Off`, `Size=S/M/L`) becomes a boolean or a select;
  - a text property becomes a text;
  - an instance swap becomes a select.

### Image: PNG, JPG, a screenshot, a photo of a sketch
- Read it with the Read tool, then describe it before writing anything:
  - the regions and their proportions to the whole widget (not pixels);
  - the texts and numbers;
  - the colors, as hex estimates;
  - the font, mapped to the closest common one.
- Ask the user when the image leaves something open: which numbers are live values and which are
  fixed, and what the widget looks like in states not shown (alarm, no data, disabled).
- Icons and drawings: redraw them as inline SVG. Never cut parts of the screenshot into images.

### PDF: a specification, a datasheet, an HMI mockup
- Read the pages with the Read tool (`pages`, at most 20 per call).
- Drawings and text usually come together:
  - the drawing gives the view;
  - the text gives the ranges, units, states, thresholds and colors. They fill the property plan and
    its defaults.
- A document with several widgets: list them, and confirm with the user which one to build and in
  which order.

## 2. The property plan

Use the table of from-html.md, step 1, plus these rows, frequent in designs:

| In the design | Property | Usually |
|---|---|---|
| a sample value with a unit ("72.4 °C") | the value, and the unit | value: datalink (`attachTag: true`); unit: text |
| a component variant driven by the field (on/off, running/stopped, alarm) | a boolean or a select | datalink |
| colors of states (normal, warning, alarm) | colors, plus their thresholds | colors in "Style" or "Alarms"; thresholds numeric, sometimes datalink |
| labels in the language of the design | texts | translatable (`supportI18n: true`) |

Show the plan to the user (SKILL.md, step 2) before writing the mockup.

## 3. The mockup

- Write one HTML file with inline CSS in a scratch folder, not in `src`.
- The root fills its box (`width: 100%; height: 100%`).
- Mark every part that becomes a property, e.g. `data-prop="level"`, so the view of the widget knows
  where each property goes.
- Fill the mockup with the default values of the plan.
- Continue with [from-html.md](from-html.md), step 2: the markup, the CSS, the resources.

## 4. The visual check

- With the dev server (`yarn dev`, needs a login) and a browser tool (e.g. chrome-devtools MCP), add
  the widget to a dashboard at the default size of the gallery, take a screenshot and compare it with
  the design's screenshot or image.
- Without them, open the mockup in a browser and compare the mockup instead.
- Report to the user the differences you leave (fonts not available, effects not reproduced).

## 5. Describe it for the AI assistant

The Corvina AI assistant chooses and connects widgets from what they declare. A widget it cannot read
is a widget it does not use:

- `registerWidget` (in `src/main.ts`), when `_corvina/src/classes/widgetCreation.d.ts` declares
  `displayName` (the typings of a project created before do not, and the fields would fail its build:
  copy `_corvina` from the SDK first):
  - `displayName`: the name in the gallery;
  - `description`: one or two sentences on what the widget shows and which data it expects, e.g.
    *"Vertical tank showing a fill level in percent (0-100); turns to the alarm color above
    alarmLevel."*;
- every property in the properties handler: `display` and `description`. For the ones with
  `attachTag`, say which tag fits: type, unit, range (*"fill level in %, a numeric tag 0-100"*);
- `dataModel`, when the widget has one main value: the editor and the assistant connect a whole
  device to it by tag type:
  ```typescript
  dataModel: [
    { type: "double", links: [ { match: ".*", properties: [ "level" ] } ] },
    { type: "integer", links: [ { match: ".*", properties: [ "level" ] } ] }
  ]
  ```
  Without it, properties with `attachTag` can still be connected one by one.

Older Corvina versions ignore `displayName` and `description` in `registerWidget`: the widget loads
the same.
