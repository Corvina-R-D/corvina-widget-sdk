/*
 * Technologies available to `corvina-sdk create widget <tech>`.
 *
 * Every widget gets the files of templates/common (defs, gallery, properties handler) plus the files
 * of templates/<template>. `setup` lists the build changes the technology needs (see setup.js),
 * `dependencies`/`devDependencies` are added to package.json when missing.
 */
const techs = {
  dom: {
    label: "DOM API, no UI libraries",
    aliases: ["vanilla", "js"],
    template: "dom"
  },
  lit: {
    label: "lit-html templates",
    template: "lit",
    dependencies: { "lit-html": "^3.3.0" }
  },
  react: {
    label: "React 19 components (TSX)",
    template: "react",
    dependencies: { "react": "^19.1.0", "react-dom": "^19.1.0" },
    devDependencies: { "@types/react": "^19.1.0", "@types/react-dom": "^19.1.0" },
    setup: ["tsx"]
  },
  vue3: {
    label: "Vue 3 components (render functions)",
    template: "vue3",
    // "vue" is the Vue 2 of Corvina (webpack external): Vue 3 is installed and imported as "vue3"
    dependencies: { "vue3": "npm:vue@^3.5.0" },
    setup: ["vue3-flags"],
    notes: [
      "Vue 3 is imported from \"vue3\": \"vue\" is the Vue 2 of Corvina.",
      "The .vue files of the project are compiled for Vue 2: write the Vue 3 components with h() render functions.",
      "Vue 3 libraries importing \"vue\" (Vuetify 3, Pinia, ...) would receive Vue 2: build them in a separate bundle."
    ]
  },
  vue: {
    label: "Vue 2 component (classic SDK widget)",
    aliases: ["vue2"],
    template: "vue",
    // Registered with `component`: the widget is rendered by the dashboard Vue 2 instance
    component: true,
    /*
     * Only to compile the .vue files: at runtime Vue 2 is the one of Corvina (webpack external), so the
     * versions are the ones of corvina-frontend, the templates are compiled for the Vue that runs them
     */
    devDependencies: {
      "vue": "2.6.14",
      "vue-loader": "15.9.8",
      "vue-style-loader": "^4.1.3",
      "vue-template-compiler": "2.6.14",
      "vue-typescript-import-dts": "^4.0.0"
    },
    setup: ["vue2-sfc"]
  }
};

function resolveTech(name) {
  if (!name) return null;
  const key = name.toLowerCase();
  if (techs[key]) return { key, ...techs[key] };
  const found = Object.keys(techs).find(k => (techs[k].aliases || []).includes(key));
  return found ? { key: found, ...techs[found] } : null;
}

module.exports = { techs, resolveTech };
