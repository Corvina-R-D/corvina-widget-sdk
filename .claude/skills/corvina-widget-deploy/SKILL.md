---
name: corvina-widget-deploy
description: Upload the widget package of a Corvina SDK project to a Corvina organization, from the browser through the WebMCP tools of the Corvina page, then try the widgets on a dashboard connected to real devices. Use it when the user asks to upload, publish or deploy the widgets, or to try them on a dashboard or with real devices.
---

# Uploading a widget package

The agent drives a browser where Corvina is open. The Corvina page publishes WebMCP tools, downloads
the zip from this computer, and asks the user to confirm the upload in its assistant panel (✨).
Nothing is uploaded without that confirmation.

## Prerequisites
Check them in this order. When one is missing, tell the user what to do; do not work around it.
When the user does not want the connector, or that Corvina has no such tools, follow
[Without the connector](#without-the-connector) instead.

1. **The Corvina AI connector**: the MCP server `corvina-chrome-devtools`, with the tools
   `list_webmcp_tools` and `execute_webmcp_tool`. When it is missing, the user installs it:
   - in Corvina, opens the AI assistant (✨) and downloads the connector from its empty chat;
   - runs it and picks Claude Code among the apps;
   - restarts Claude Code, or reconnects the servers with `/mcp`.

   The connector opens its own Chrome window: the user logs in to Corvina there once. A
   chrome-devtools MCP server already set up with WebMCP on works too.
2. **Corvina with the assistant's WebMCP tools**, open in that window: `list_webmcp_tools` must list
   `upload_widget_package`.
   - When it lists the dashboard tools but not this one, that Corvina version cannot upload packages.
   - When it lists nothing: the page may still be loading (list again after a few seconds), or the
     tools are off for that Corvina. Then, in the page console, once:
     `localStorage.setItem('aiAgent.webmcp', 'on')`, and reload.
3. **Introduce yourself**: call `get_dashboard_context` first, with `agent` (the app you run in and
   your model). Until then the other tools return `status: "identify_first"` and do nothing.
4. **Permission**: `list_widget_packages` returns `canUpload: true`. Otherwise `reason` says why: the
   user may not modify the organization, or custom widgets are not enabled there.

## Steps
1. **Package name.** `name` in `src/manifest.json` prefixes the widget types (`<name>.<Widget>`) and
   identifies the package in the organization.
   - It cannot be `org`: that is the name of the SDK examples.
   - Call `list_widget_packages`. A package with the same name is **replaced** by the upload: when
     it is not an earlier upload of this project, ask the user.
   - Renaming the package means renaming the types too: `defs.ts` of every widget and `widgets` in
     the manifest.
2. **Check and build.** Run `node .claude/skills/corvina-widget/scripts/check-widget.js
   src/widgets/<Name>` for every widget and fix its errors. Fix the warnings on descriptions too:
   the assistant reads them. Then run `yarn build`, which makes `dist/upload/<name>.zip`.
3. **Serve the zip** to the page, in the background, with a secret of your own (16 or more letters
   and digits, new every time):
   ```bash
   node .claude/skills/corvina-widget-deploy/scripts/serve-package.js --token <secret>    # --port <n>, default 8090
   ```
   It serves only the zips of `dist/upload`, on 127.0.0.1, with the CORS headers the page needs, and
   only to requests that have the secret in the path: any site open in the browser can reach a
   local server. Without `--token` it makes a random one and prints the URLs.
4. **Upload**: call `execute_webmcp_tool` with `upload_widget_package`,
   `{ "url": "http://localhost:8090/<secret>/<name>.zip" }` (the URL the server prints).
   - The page checks the package. When it is fine, the page asks the user in the assistant panel:
     tell the user to confirm there.
   - The call returns the user's answer, or `waiting_for_user` when they have not answered within a
     few minutes:

   | Result | Meaning |
   |---|---|
   | `status: "uploaded"` | `widgets` lists the types. A type with `errors` did not load (e.g. `lib.js` throws, the type is not in the manifest): fix, build, upload again |
   | `status: "rejected"` | `problems` says what to fix in the package; nothing was asked or uploaded |
   | `status: "discarded"` | the user said no: do not upload again without asking |
   | `status: "waiting_for_user"` | the question is still open in the panel: remind the user, then call again with the same `url` to get the answer |
   | `error` | download (server not running, other port), permission, or the upload itself |

5. Stop the server when you are done.

## Try it on a dashboard, with real devices
The other tools of the page work on dashboards. Follow the rules that `get_dashboard_context`
returns in `instructions`: layout of new dashboards, confirmations before removing widgets.

1. **The dashboard.** `list_dashboards` + `open_dashboard` to open an existing one, or
   `create_dashboard` from the dashboard list.
2. **The widget.** `get_dashboard_context` lists the new types among the widgets, with the
   `description` given in `registerWidget`. A `notes` entry of the upload says when the dashboard's
   profile does not allow them.
3. **Its properties.** `get_widget_schema` on the type returns its properties as Corvina reads them.
4. **The devices.** `search_organization_devices`, then `get_device_model` for the tags and their
   types.
5. **The plan.** `propose_plan` with an `addWidget` of the type and a `connectTag` for every
   property with `attachTag`, each to a tag of the right type. Use `createDefaultLinks` when the
   widget declares a `dataModel`. Nothing changes until the user decides: follow the `action` of
   the result. Depending on the Corvina version and its settings, the user applies the plan in the
   assistant panel, or answers in your chat and you call `apply_plan` with their answer.
6. **The check.** Ask the user whether the widget shows live values. With a screenshot tool
   (the Corvina AI connector has none), look at the dashboard yourself.

## Without the connector
The upload stays manual, as before this skill:
1. Do steps 1 and 2 above, without `list_widget_packages`: the user knows whether a package with
   that name is already in the organization.
2. Tell the user to upload `dist/upload/<name>.zip` in Corvina's dashboard editor, from the widget
   gallery (+, custom widgets), as in
   [Deploy](https://docs.corvina.cloud/docs/sdk-dashboard-widget/Deploy), then to add the widget to
   a dashboard and connect its properties to device tags.

## After a change
Build and upload again with the same name: the package is replaced. Widgets already on a dashboard
change when the dashboard is reopened.

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| `Cannot download http://localhost:8090/...` | serve-package.js not running, another port, or Chrome on another machine |
| `... answered 404` | the secret is missing or wrong in the URL (use the one the server printed or you gave it), or no zip with that name in `dist/upload`: run `yarn build`, check `name` in the manifest |
| `... answered 403` | the URL does not use `localhost` or `127.0.0.1` |
| `upload_widget_package` not listed | `aiAgent.webmcp` not set or page not reloaded; Corvina version without the tool; Chrome without WebMCP; the page still loading (list again after a few seconds) |
| `status: "identify_first"` | call `get_dashboard_context` with `agent` first, then the tool again |
| `canUpload: false` | the user's permission, or custom widgets not enabled in the organization |
| the type is not in `get_dashboard_context` | the dashboard's profile does not allow it, or the widget had load `errors` |
| the widget is there but the assistant misuses it | missing or vague `description` in `registerWidget` or on the properties |
