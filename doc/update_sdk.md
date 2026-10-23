# Manual update for internal use

To update manually the SDK it is necessary:

1. Update the typescript definitions (`_corvina`), from the `develop` branch of corvina-frontend:
   ```bash
   # in corvina-frontend/frontend-new: writes dist/_corvina (constants.d.ts and src/), about 3 seconds
   yarn build-sdk-definition
   # in corvina-sdk: replace the whole folder, the files removed from the frontend must go too
   rm -rf _corvina && cp -r ../corvina-frontend/frontend-new/dist/_corvina _corvina
   yarn build
   ```
2. Update the corvina-app "binaries"
   -  Build corvina-app, yarn run build
   -  Replace the content of the directory dist/ of corvina-sdk with the content of the directory dist/ of corvina-app
3. Update ./index.html, it necessary to update the reference of webpack externals:
   - runtime.[hash].js
   - vue.[hash].js
   - BrandData.[hash].js
   - corvina.[hash].js

  Example:

  ```
      <script type="text/javascript" src="/dist/runtime.c336cd8497c9572de128.js"></script>
      <script type="text/javascript" type="module" src="/dist/vue.9cdcd0afbec169f3db47.js"></script>
      <script type="text/javascript" src="/dist/BrandData.711895609c381b46f725.js"></script>
      <script type="text/javascript" type="module" src="/dist/corvina.0b3b36a52cef14a6a7f1.js"></script>
  ````

# Test with a local build of corvina-frontend

`yarn dev` loads the released Corvina runtime (`https://app.corvina.io/dist/`). `yarn dev:local` loads
instead a local build of the SDK bundle of corvina-frontend, copied into `dist/corvina/` (not versioned),
with the `static` folders of the frontend served before the ones of the SDK:

```bash
# in corvina-frontend/frontend-new
NODE_ENV=production yarn run build-sdk-lib
# in corvina-sdk (the argument defaults to ../corvina-frontend/frontend-new)
node scripts/use-local-corvina.js ../corvina-frontend/frontend-new
yarn run dev:local
```

Repeat the first two steps after every change of corvina-frontend, then reload the page. The runtime
is chosen in `webpack.config.js` (`corvinaRuntime`, passed to `index.html`).
