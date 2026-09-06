# Vue application

A Vue 3 and TypeScript application built with [Vite](https://vite.dev/).

## Requirements

Use a current Node.js 22 or 24 LTS release. The base project supports Node.js 20.19+ or 22.12+; ESLint requires 22.13+ on the Node 22 line and does not support Node 23. Netlify CLI requires Node.js 22.13+ or newer. Check `engines.node` in `package.json` for the exact requirement selected for this project.

## Editor setup

Use [Visual Studio Code](https://code.visualstudio.com/) with [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar). Disable Vetur for this workspace. Vue - Official provides `.vue` type support; the old separate TypeScript Vue Plugin and Take Over Mode instructions are obsolete. Leave VS Code's built-in TypeScript and JavaScript Language Features enabled.

## Development

Use the package manager selected when generating this project. The examples use npm; replace `npm install` and `npm run` with the equivalent commands for pnpm, Yarn, or Bun. If dependencies were installed during generation, skip installation.

```sh
npm install
npm run dev
```

## Type checking and production

```sh
npm run type-check
npm run build
npm run preview
```

`type-check` runs `vue-tsc --build` against the application and tooling projects referenced in `tsconfig.json`, including `.vue` components. TypeScript 5.9 is used because Vue's type checker relies on the TypeScript JavaScript compiler API.

`build` bundles the app into `dist`; it does not run the type checker. Run both commands in CI. Preview serves the production build locally and is not a production server. See the [Vite configuration reference](https://vite.dev/config/) for customization.

## Optional tooling

Only the features selected during generation are installed. Use `npm run` to list available scripts.

- **ESLint:** `npm run lint` checks TypeScript, JavaScript, and Vue files and applies safe automatic fixes. Configure rules, browser/Node globals, and ignored build directories in `eslint.config.js`. Vue script blocks use `lang="ts"`; type checking remains a separate command.
- **Vitest:** `npm run test:unit` starts watch mode; `npm run test:unit -- --run` runs once. The jsdom environment and Vue Test Utils are ready for component tests. Add behavior-focused `*.spec.ts` or `*.test.ts` files under `src/**/__tests__/`. No wording-only starter test is included, and an empty suite exits successfully. Tests are excluded from the application type-check; run `npm exec -- vue-tsc --build tsconfig.vitest.json` to type-check them separately.
- **Tailwind CSS:** configured through `@tailwindcss/vite` and `src/assets/css/tailwind.css`; no PostCSS configuration is required.
- **Vue Router:** `/` renders the welcome view; `/about` loads the about view lazily. Configure routes in `src/router/index.ts`.
- **Pinia:** `src/stores/counter.ts` demonstrates reactive state, a derived value, and an increment action.
- **VueUse:** import composition utilities from `@vueuse/core` as needed.
- **TanStack Vue Query:** the plugin is registered in `src/main.ts`, and `App.vue` includes its development-only Query Devtools.
- **Vue DevTools:** the Vite plugin provides the in-app development tools.

When selected, Vercel or Netlify CLI is installed locally and the corresponding deployment configuration includes SPA fallback routing. Run the local CLI through your package manager (for example, `npm exec -- vercel --help` or `npm exec -- netlify --help`). Deployment requires your account credentials and should be initiated deliberately. Netlify builds use Node.js 22.
