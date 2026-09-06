# Create Vue 3 App

Scaffold a Vue 3 application with Vite. Choose JavaScript or TypeScript, routing, state management, styling, testing, and deployment tooling without assembling a starter project by hand.

## Quick start

Use Node.js **20.19+ or 22.12+**; a current Node 22 or 24 LTS release is recommended.

```sh
npx @selemondev/create-vue3-app@latest my-app
```

The guided flow asks for a language, groups optional features into one selection, and lets you install dependencies now or later. Use Space to toggle features and Enter to continue. Ctrl+C cancels with exit status 1, without a stack trace.

For files only, with the guided defaults:

```sh
npx @selemondev/create-vue3-app@latest my-app --yes --no-install
cd my-app
npm install
npm run dev
```

The package can also be installed globally with `npm install -g @selemondev/create-vue3-app` and invoked as `create-vue3-app`.

## Commands and choices

There is one scaffolding command, not a set of subcommands:

```text
create-vue3-app [options] [project-name]
```

Run `--help` for the complete reference, or `--version` for the package version. Neither probes package managers, creates files, or accesses the network.

| Choice | Enable | Disable | Guided default |
| --- | --- | --- | --- |
| TypeScript | `--ts`, `--typescript` | `--no-typescript` | Enabled |
| Tailwind CSS | `--tailwind` | `--no-tailwind` | Enabled |
| Vue Router | `--router` | `--no-router` | Enabled |
| Pinia | `--pinia` | `--no-pinia` | Enabled |
| VueUse | `--vueuse` | `--no-vueuse` | Disabled |
| TanStack Vue Query | `--query` | `--no-query` | Enabled |
| Vue DevTools | `--devtools` | `--no-devtools` | Enabled |
| Vitest | `--vitest` | `--no-vitest` | Enabled |
| ESLint | `--eslint` | `--no-eslint` | Disabled |
| Git and initial commit | `--git` | `--no-git` | Disabled |

Additional options:

- `--use-npm`, `--use-pnpm`, `--use-yarn`, `--use-bun`: install with that package manager. It must be on PATH.
- `--install`: install with the package manager identified by `npm_config_user_agent`, falling back to npm.
- `--no-install`: skip all dependency installation and update commands, even with a `--use-*` flag. The selected manager is retained in generated instructions and pnpm metadata.
- `--deploy none|vercel|netlify`: prepare deployment configuration and optionally add the provider CLI. It does **not** authenticate or deploy. Default: `none`.
- `-y`, `--yes`: use defaults for unanswered questions. It never authorizes overwriting files.
- `--force`: allow replacing generated files in an existing directory. Unrelated files and `.git` are preserved; conflicting symlinks are rejected.
- `--update-deps`: explicitly upgrade generated dependency ranges to latest majors before installation, using `npx`. Requires `--install` or a `--use-*` flag. These unbounded upgrades may require newer Node versions or manual migration; normal installation uses the audited template ranges instead.

The original invocation remains supported:

```sh
npx @selemondev/create-vue3-app my-app --ts --eslint --tailwind --use-pnpm
```

A minimal JavaScript application:

```sh
npx @selemondev/create-vue3-app my-app --yes --no-install \
  --no-typescript --no-tailwind --no-router --no-pinia \
  --no-query --no-devtools --no-vitest --no-eslint
```

## Automation and configuration

A project directory is required in CI, with redirected input/output, or without an interactive terminal. Unanswered choices use the same defaults as the guided flow; execution never waits for input. `--yes` provides the same behavior in a terminal. Manual installation, no deployment, and no Git are the safe defaults.

```sh
CI=1 npx @selemondev/create-vue3-app my-app --ts --eslint --use-npm
```

CLI flags override prompts/defaults. For compatibility, supplying several `--use-*` flags keeps the historical precedence: **npm, pnpm, Yarn, Bun**. Positive/negative feature flags follow command-line order. Unknown flags and additional positional arguments remain ignored as in the original CLI; check spelling if an option appears ineffective.

There is no CLI configuration file, stored user preference, authentication state, or telemetry. `npm_config_user_agent` is consulted only for `--install`. `CI`, TTY availability, and `TERM=dumb` disable interaction; `NO_COLOR` disables colors. Non-interactive output is plain text. There is no JSON output mode.

Project directories may be relative, nested, absolute, or `.`. Their basename must be a valid npm package name. Generated files are rendered and formatted in a temporary directory before modifying the destination. Existing nonempty destinations require confirmation or `--force`; filesystem roots, home directories, and conflicting symlinks are rejected. A disk or permission failure during the final merge can still leave partially copied files; the command reports failure, not success.

Successful execution exits 0. Invalid inputs, cancellation, generation errors, and failed installation/Git commands exit 1. Failed installs retain the generated project so you can correct the error and run the package manager there. Existing Git worktrees are never reinitialized or automatically committed.

## Generated applications

Projects include `dev`, `build`, and `preview` scripts, plus `lint`, `test:unit`, and `type-check` when selected. Each project includes its own README and editable Vite, TypeScript, ESLint, test, and deployment configuration as applicable. `build` bundles the app; TypeScript checking is a separate command.

New projects use Tailwind 4's Vite integration and ESLint's flat configuration. No existing application's configuration is silently migrated. Vitest and ESLint selections exclude Node 21 and 23; ESLint also requires Node 22.13+ on the Node 22 line. Netlify CLI requires Node 22.13+ or newer. The generated `engines.node` records the selected requirements. Deployment requires your own credentials and an explicit provider command.

## Development and contributions

See [CONTRIBUTING.md](CONTRIBUTING.md) for local setup, validation, anti-slop lint rules, and release commands. Changes and compatibility notes are recorded in [CHANGELOG.md](CHANGELOG.md). Bug reports and focused pull requests are welcome; please follow the [Code of Conduct](CODE_OF_CONDUCT.md).
