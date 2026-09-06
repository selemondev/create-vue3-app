const router = {
  name: "vue-router",
  version: "^5.3.1",
};
const pinia = {
  name: ["pinia", "@vue/devtools-api"],
  version: ["^4.0.3", "^8.2.1"],
};

const eslintJsVue = {
  name: [
    "eslint",
    "@eslint/js",
    "eslint-plugin-vue",
    "vue-eslint-parser",
    "globals",
  ],
  version: ["^10.10.0", "^10.0.1", "^10.11.0", "^10.4.1", "^17.12.0"],
};

const eslintTsPlugin = {
  name: [...eslintJsVue.name, "@vue/eslint-config-typescript"],
  version: [...eslintJsVue.version, "^14.9.0"],
};

const tailwind = {
  name: ["tailwindcss", "@tailwindcss/vite"],
  version: ["^4.3.3", "^4.3.3"],
};

const vueUse = {
  name: "@vueuse/core",
  version: "^14.4.0",
};

const typescript = {
  name: [
    "typescript",
    "vue-tsc",
    "@tsconfig/node22",
    "@vue/tsconfig",
    "@types/node",
  ],
  version: ["~5.9.3", "^3.3.11", "^22.0.6", "^0.9.1", "^22.20.1"],
};

const javascript = {
  name: [],
  version: [],
};

const tanStackVueQuery = {
  name: ["@tanstack/vue-query", "@tanstack/vue-query-devtools"],
  version: ["^5.102.8", "^6.1.48"],
};

const devTool = {
  name: "vite-plugin-vue-devtools",
  version: "^8.2.1",
};

const vitest = {
  name: ["vitest", "jsdom", "@vue/test-utils"],
  version: ["^4.1.11", "^27.4.0", "^2.5.0"],
};

const vercelCLI = {
  name: ["vercel"],
  version: ["^59.11.7"],
};

const netlifyCLI = {
  name: ["netlify-cli"],
  version: ["^27.5.0"],
};

const constantDevDeps = {
  name: ["vite", "@vitejs/plugin-vue"],
  version: ["^8.2.2", "^6.0.8"],
};
const constantProDeps = {
  name: "vue",
  version: "^3.5.42",
};
export {
  constantDevDeps,
  constantProDeps,
  devTool,
  tailwind,
  eslintTsPlugin,
  javascript,
  typescript,
  vitest,
  tanStackVueQuery,
  eslintJsVue,
  vueUse,
  pinia,
  router,
  vercelCLI,
  netlifyCLI,
};
