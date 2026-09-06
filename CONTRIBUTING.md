# Contributing

Use focused pull requests and [Conventional Commits](https://www.conventionalcommits.org/). Preserve existing flags, generated project capabilities, and unattended execution. Follow the [Code of Conduct](CODE_OF_CONDUCT.md); contributions are licensed under the project's MIT license.

## Local setup

Use Node.js **24 LTS** for development and **pnpm 10.34.5**, pinned in `package.json`. The published CLI supports Node 20.19+ or 22.12+, but the vendored TypeScript lint plugin needs native type stripping (Node 22.18+); development tooling must not silently raise the CLI runtime minimum.

```sh
npm install -g pnpm@10.34.5
pnpm install --frozen-lockfile
pnpm dev --help
pnpm dev /tmp/my-vue-app --yes --no-install
```

Use a disposable directory for scaffolding. `pnpm dev` runs TypeScript directly; `pnpm build:package` produces the published ESM and CommonJS entries, declaration files, and lazy ESM chunks in `dist/`. Templates are packaged beside `dist/`.

## Validation

```sh
pnpm typecheck
pnpm lint
pnpm test
pnpm test:templates
pnpm pack
```

- `typecheck` checks CLI source and regression tests, not unrendered template sources.
- `lint` runs Oxlint and all generic anti-slop rules, treating warnings as failures.
- `test` builds the package and runs isolated Node test-runner regressions against actual CLI/subprocess/filesystem behavior. No prompt snapshots or module mocks are required.
- `test:templates` builds the CLI, generates full and minimal JS/TS applications in temporary directories, installs their dependencies with npm, builds them, and exercises selected lint, type-check, and Vitest workflows. Lint runs with `--no-fix`, including the temporary test file, so verification cannot silently repair generated defects. It requires network access and cleans up its fixtures. Its temporary counter test verifies a real Pinia transition; generated projects are not populated with wording-only starter tests.
- `pack` checks the distributable; do not publish smoke-test artifacts.

For interaction changes, also use a real terminal: inspect the guided flow, feature toggles, cancellation, a nonempty destination, and `NO_COLOR=1`. Check redirected input and `CI=1` separately. Help/version must remain fast, network-free, and free of package-manager detection errors.

CI validates the CLI on Linux, Windows, and macOS, includes the supported Node runtime floor, and runs generated-project integration and lint on Node 24. Hosted CI results are required before merging; a locally passing Linux check is not evidence of Windows/macOS execution.

## Architecture

- `src/index.ts`: Commander registration, flags, runtime guard, deferred workflow loading, and top-level error status.
- `src/core/questions/vue/`: gathers intent and prepares template data. Flags are resolved before interactive questions.
- `src/core/command/create-vue-next/`: staged generation, installation, and optional Git initialization.
- `src/deps/vue/` and `template/`: dependency ranges and generated project files.
- `src/utils/`: checked subprocesses, rendering, validation, and terminal-aware Clack output.

Do not add a new abstraction for a single callback or add a configuration system the CLI does not need. Fix expected errors at their source; never convert a failed subprocess or formatter into success.

## Anti-slop

The [anti-slop installation skill](https://github.com/dmmulroy/anti-slop/tree/main/skills/install-anti-slop) was used to vendor the generic plugin into `tools/oxlint/anti-slop`. Its upstream commit and license are included there. `oxlint.config.ts` enables all 15 generic rules at error; no Effect policy is enabled because this project does not use Effect.

The agent skill itself is not part of this repository. Do not commit downloaded skills, installer scripts, or agent directories. The vendored lint implementation **is** project tooling and is intentionally committed. Keep `oxlint` and `@oxlint/plugins` pinned to exactly matching versions. Compare upstream changes before replacing local rules; do not disable rules or add unsafe casts just to pass lint.

## Dependencies and releases

Update CLI dependencies and generated application dependencies as separate reviewed changes. Check engine requirements, peers, removed APIs, both module formats, and installed template workflows before moving a major version. TypeScript stays on the 5.9 compiler API used by tsup and vue-tsc; Commander 14 retains its CommonJS-compatible line and Node 20 support. Package-name validation stays on version 7 because version 8 requires newer Node patch releases than the supported runtime floor. Do not blanket-upgrade generated dependencies during normal scaffolding.

Existing release commands remain available:

```sh
pnpm generate:release
pnpm package:beta
pnpm package
```

`generate:release` runs changelogen to update release metadata. `package:beta` builds and publishes with the beta tag; `package` builds and publishes publicly. These commands mutate release state or publish to npm and require maintainer authorization and npm credentials. Run all validation and inspect the tarball before publishing. Never run publishing commands as a smoke test.

Document behavior changes in `CHANGELOG.md`, and commit each coherent implementation step separately with its relevant verification.
