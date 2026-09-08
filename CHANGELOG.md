# Changelog

## v1.0.0

[compare changes](https://github.com/selemondev/create-vue3-app/compare/v0.0.12...v1.0.0)

### CLI experience

- Replace the legacy prompt and spinner libraries with `@clack/prompts`: language selection, grouped feature choices, project summaries, progress, and actionable next steps.
- Preserve existing flags, `--ts`/`--typescript`, package-manager precedence, package identity, binary mapping, and ESM/CommonJS entry points.
- Add negative feature flags, `--yes`, `--install`, `--no-install`, `--deploy`, `--git`, `--no-git`, and explicit overwrite control with `--force`.
- Make unattended execution deterministic: require a project directory and use guided defaults for unanswered choices. CI, redirected streams, and dumb terminals never wait for prompts.
- Keep help/version on a deferred, network-free startup path; report expected errors and cancellation without stack traces.

### Safety and compatibility

- Render and format templates in a temporary directory before modifying the destination. Reject conflicting symlinks, filesystem roots, and home directories.
- Existing nonempty destinations now require confirmation or `--force`. `--yes` never authorizes overwriting; unrelated files and Git state are preserved.
- Propagate installation, Git, rendering, and formatting failures instead of reporting success. Pass subprocess arguments literally rather than through a shell.
- Preserve existing Git worktrees and their index/history instead of reinitializing or committing them.
- Normal installation now uses reviewed template dependency ranges. Previously automatic latest-major updates require `--update-deps` and `npx`; installation must also be enabled.
- Declare and enforce Node `^20.19.0 || >=22.12.0` for the CLI. Generated ESLint/Vitest/Netlify selections record their additional runtime constraints in `engines.node`; development linting uses Node 24.

### Dependencies and generated applications

- Update Commander, EJS, fs-extra, Prettier, TypeScript, tsup, and generated Vue tooling. Replace esno with tsx; remove prompts, ora, picocolors, unused conf, and obsolete prompt types.
- Modernize Vue Router, Pinia, VueUse, Vue Query, DevTools, Vitest, Vite, and deployment CLIs. Use Tailwind 4's Vite integration and ESLint flat configuration.
- Keep TypeScript on 5.9 for the existing compiler integrations, Commander on its CommonJS-compatible Node 20 line, and package-name validation on its Node 20-compatible line.
- Add focused behavioral regressions, real generated-project validation, and CI coverage for supported Node versions plus Linux, Windows, and macOS.
- Configure all generic anti-slop rules through vendored project tooling with matching, pinned Oxlint dependencies. Agent skills and skill directories are not committed.


## v0.0.11

[compare changes](https://github.com/selemondev/create-vue3-app/compare/v0.0.10...v0.0.11)

### 🚀 Enhancements

- Check dependency updates ([60016a9](https://github.com/selemondev/create-vue3-app/commit/60016a9))
- Add Tailwind v4 and update template ([94eff3d](https://github.com/selemondev/create-vue3-app/commit/94eff3d))

### 🏡 Chore

- Remove unused imports ([72d4446](https://github.com/selemondev/create-vue3-app/commit/72d4446))

### ❤️ Contributors

- Selemondev <selemondev19@gmail.com>

## v0.0.8

[compare changes](https://github.com/selemondev/create-vue3-app/compare/v0.0.7...v0.0.8)

### 🩹 Fixes

- Import names from fs-extra ([520ae91](https://github.com/selemondev/create-vue3-app/commit/520ae91))

### 🏡 Chore

- **release:** V0.0.8 ([c9d15e5](https://github.com/selemondev/create-vue3-app/commit/c9d15e5))

### ❤️ Contributors

- Selemondev <selemondev19@gmail.com>

## v0.0.8

[compare changes](https://github.com/selemondev/create-vue3-app/compare/v0.0.3...v0.0.8)

### 🏡 Chore

- Update version and generate release ([209469c](https://github.com/selemondev/create-vue3-app/commit/209469c))

### ❤️ Contributors

- Selemondev <selemondev19@gmail.com>

## v0.0.3

[compare changes](https://github.com/selemondev/create-vue3-app/compare/v0.0.2...v0.0.3)

### 🚀 Enhancements

- Add Vercel CLI ([f8bc9d1](https://github.com/selemondev/create-vue3-app/commit/f8bc9d1))
- Add Netlify CLI ([3f9e607](https://github.com/selemondev/create-vue3-app/commit/3f9e607))

### 🔥 Performance

- Reduce bundle size ([01c3e21](https://github.com/selemondev/create-vue3-app/commit/01c3e21))

### 🩹 Fixes

- Logs ([f5cb146](https://github.com/selemondev/create-vue3-app/commit/f5cb146))
- **app:** CSS overflow in UI ([84bdba5](https://github.com/selemondev/create-vue3-app/commit/84bdba5))
- Package name ([5b74067](https://github.com/selemondev/create-vue3-app/commit/5b74067))

### 💅 Refactors

- Remove 'route' based folders ([42e0ec9](https://github.com/selemondev/create-vue3-app/commit/42e0ec9))
- Use named imports instead of default imports ([b8e1daa](https://github.com/selemondev/create-vue3-app/commit/b8e1daa))

### 📖 Documentation

- Update ([264541e](https://github.com/selemondev/create-vue3-app/commit/264541e))
- Update docs ([b6add94](https://github.com/selemondev/create-vue3-app/commit/b6add94))

### 🏡 Chore

- **release:** V0.0.2 ([571f612](https://github.com/selemondev/create-vue3-app/commit/571f612))
- Rename from create-vue-next to @selemondev/create-vue3-app ([9a1a878](https://github.com/selemondev/create-vue3-app/commit/9a1a878))
- Rename from create-vue-next to @selemondev/create-vue3-app ([8b5957c](https://github.com/selemondev/create-vue3-app/commit/8b5957c))
- Update issue templates ([05dc349](https://github.com/selemondev/create-vue3-app/commit/05dc349))
- Package name ([27a52c1](https://github.com/selemondev/create-vue3-app/commit/27a52c1))
- Import paths hierarchy ([47e186b](https://github.com/selemondev/create-vue3-app/commit/47e186b))

### ❤️ Contributors

- Selemondev ([@selemondev](https://github.com/selemondev))
- Selemondev-triply ([@selemon-dev](https://github.com/selemon-dev))

## v0.0.2

[compare changes](https://github.com/selemondev/create-vue-next/compare/v0.0.1...v0.0.2)

### 📖 Documentation

- Update docs ([169b8fd](https://github.com/selemondev/create-vue-next/commit/169b8fd))

### ❤️ Contributors

- Selemondev <selemondev19@gmail.com>

## v0.0.1


### 🚀 Enhancements

- Add Eslint ([5856331](https://github.com/selemondev/create-vue-next/commit/5856331))
- Add Vitest ([6e00e75](https://github.com/selemondev/create-vue-next/commit/6e00e75))
- Add tanstack vue query ([a2ad6b9](https://github.com/selemondev/create-vue-next/commit/a2ad6b9))
- Add deployment targets ([d515ec9](https://github.com/selemondev/create-vue-next/commit/d515ec9))
- Add program ([7b6be5a](https://github.com/selemondev/create-vue-next/commit/7b6be5a))
- Add flags ([bcea877](https://github.com/selemondev/create-vue-next/commit/bcea877))
- Add DevTool ([60dbdef](https://github.com/selemondev/create-vue-next/commit/60dbdef))
- Add VueUse dep ([8f9f57c](https://github.com/selemondev/create-vue-next/commit/8f9f57c))
- Add default template styles ([39d845f](https://github.com/selemondev/create-vue-next/commit/39d845f))
- Add box size CSS property ([6698b7a](https://github.com/selemondev/create-vue-next/commit/6698b7a))
- Add LICENSE ([c4bb9fa](https://github.com/selemondev/create-vue-next/commit/c4bb9fa))

### 💅 Refactors

- Codebase ([c9b6abe](https://github.com/selemondev/create-vue-next/commit/c9b6abe))
- Codebase ([9165b39](https://github.com/selemondev/create-vue-next/commit/9165b39))
- Files ([4bca287](https://github.com/selemondev/create-vue-next/commit/4bca287))

### 📖 Documentation

- Update ([c7df7e7](https://github.com/selemondev/create-vue-next/commit/c7df7e7))
- Add docs ([c13b1f7](https://github.com/selemondev/create-vue-next/commit/c13b1f7))

### 🏡 Chore

- Cleanup ([0d0f6f3](https://github.com/selemondev/create-vue-next/commit/0d0f6f3))
- Update dependencies ([3b2fd8a](https://github.com/selemondev/create-vue-next/commit/3b2fd8a))
- Remove @types/ora and add @types/prompts ([eec1f96](https://github.com/selemondev/create-vue-next/commit/eec1f96))
- Remove lock files from .gitignore ([6b395fc](https://github.com/selemondev/create-vue-next/commit/6b395fc))

### ❤️ Contributors

- Selemondev <selemondev19@gmail.com>
- Selemon Dev <selemon@nathandigital.com>

