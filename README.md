# Corvina Widget SDK

Environment to develop, test and package custom widgets for Corvina dashboards: a dev server that runs
the Corvina dashboard editor with your widgets, the typings of the `corvina` module, examples and a CLI
to create widgets and projects.

Complete documentation: [Dashboard Widget SDK](https://docs.corvina.cloud/docs/category/dashboard-widget-sdk)
on the Corvina Developer Portal.

## Requirements

- [Node.js](https://nodejs.org/) 22 (the CLI alone runs on Node.js 20 or later)
- [Yarn](https://yarnpkg.com/) 4
- A Corvina account on the instance to connect to; uploading widgets needs the permission to modify
  the organization

## Getting started

```bash
cp .env.example .env     # set CORVINA_HOST and CORVINA_REALM, see below
yarn install
yarn dev
```

Open [http://localhost:8080](http://localhost:8080): you should see the Corvina login page. After the
login, open the dashboard editor: the widgets of the SDK are in the widget gallery. The dev server
rebuilds on every change of the sources.

### Corvina instance

The dev server connects to the Corvina instance configured in `.env` (copied from `.env.example`, not
committed):

| Variable | Value | Default |
|---|---|---|
| `CORVINA_HOST` | host name of the Corvina instance | `corvina.cloud` |
| `CORVINA_REALM` | realm of the organization to log in to | `realm` |
| `CORVINA_I18N_HOST` | host of the translations, optional | the one of the instance |

The default of `CORVINA_REALM` is a placeholder: set it to the realm of your organization.

The variables of the shell win over the file: `CORVINA_HOST=corvina.io yarn dev`. The values are
passed by `index.ts` to `setCommunicationSettings`. See
[Instance configuration](https://docs.corvina.cloud/docs/sdk-dashboard-widget/Instance%20configuration).

## Scripts

| Command | |
|---|---|
| `yarn dev` | dev server on port 8080, with the released Corvina runtime |
| `yarn build` | builds the package: `dist/org/lib.js` and the zip to upload, `dist/upload/<name>.zip` |
| `yarn corvina-sdk ...` | CLI to create widgets and projects, see below |

## Project layout

| Path | |
|---|---|
| `src/main.ts` | registers the widgets of the package (`registerWidget`) |
| `src/manifest.json` | package name (`name`, prefix of the widget types) and list of the widgets |
| `src/examples/` | example widgets: Vue 2, DOM API, lit-html, datasets, historical data |
| `src/resources/` | images and other resources of the package |
| `index.ts` | settings of the Corvina instance of the dev server |
| `_corvina/` | typings of the `corvina` module, provided by Corvina at runtime |
| `static/` | files served by the dev server under `/static/` |

## CLI

The CLI creates widgets in the technology of choice, preparing the build for it, and new SDK projects:

```bash
yarn corvina-sdk list                                    # available technologies
yarn corvina-sdk create widget react TemperatureGauge    # new widget in this project
yarn corvina-sdk create project ../my-widgets --package acme-gauges --tech react --widget TemperatureGauge
```

Technologies: `dom` (DOM API), `lit` (lit-html), `react`, `vue3` and `vue` (Vue 2). A widget can be
written without Vue.js by implementing `render(root)`, see
[Widgets without Vue.js](https://docs.corvina.cloud/docs/sdk-dashboard-widget/widgets_without_vue).

`--package` is the name of the package in Corvina: it must be unique in the organization (`org`, the
name of the SDK examples, is refused). The created projects have their own copy of the CLI.

See [SDK CLI](https://docs.corvina.cloud/docs/sdk-dashboard-widget/cli) and [doc/cli.md](doc/cli.md).

## Deploy

1. Set `name` in `src/manifest.json` to a name unique in the organization: a package uploaded with the
   name of another one replaces it.
2. Run `yarn build`: the package is `dist/upload/<name>.zip`.
3. In the Corvina dashboard editor open **Widget Gallery** → **Custom Widget**, click **+** and upload
   the zip.

See [Deploy](https://docs.corvina.cloud/docs/sdk-dashboard-widget/Deploy).

## Claude Code skill

The skill `.claude/skills/corvina-widget` helps [Claude Code](https://claude.com/claude-code) to build
widgets from a specification or from HTML code; the projects created by the CLI have it too. See
[Claude Code skill](https://docs.corvina.cloud/docs/sdk-dashboard-widget/claude_code_skill).

## More documentation

- Developer Portal: [Overview](https://docs.corvina.cloud/docs/sdk-dashboard-widget/Overview),
  [Installation](https://docs.corvina.cloud/docs/sdk-dashboard-widget/Installation),
  [Changelogs](https://docs.corvina.cloud/docs/category/changelogs)
- In this repository: [doc/cli.md](doc/cli.md), [doc/widgets_without_vue.md](doc/widgets_without_vue.md),
  [Changelog.md](Changelog.md)
