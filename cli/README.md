# @corvina/widget-sdk-cli

Scaffolding of Corvina dashboard widget projects and widgets, without dependencies.

```bash
npx @corvina/widget-sdk-cli create project my-widgets --package acme --tech react --widget TemperatureGauge
cd my-widgets
yarn corvina-sdk create widget vue3 Tank
yarn dev
```

| Command | |
|---|---|
| `corvina-sdk create project <dir>` | New project: Corvina typings, dev server, build for TypeScript widgets |
| `corvina-sdk create widget <tech> <Name>` | New widget in the project: `dom`, `lit`, `react`, `vue3`, `vue` (Vue 2) |
| `corvina-sdk list` | Available technologies |

Every technology adds its dependencies and build changes with its first widget: a project without
Vue 2 widgets does not install Vue. See `doc/cli.md` in the created project for the details.

The package carries a snapshot of the Corvina SDK (typings, dev server files), made when it is packed:
it is published by the GitHub release workflow of the SDK repository (see `doc/cli.md`).
