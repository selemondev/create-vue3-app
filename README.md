<h1 align="center">Create Vue 3 App</h1>

<div align="center">

<!-- automd:badges name="@selemondev/create-vue3-app" github="selemondev/create-vue3-app" license licenseBranch="master" provider="shields" color="00DC82" labelColor="020420" bundlephobia packagephobia -->

[![npm version](https://img.shields.io/npm/v/@selemondev/create-vue3-app?color=00DC82&labelColor=020420)](https://npmjs.com/package/@selemondev/create-vue3-app)
[![npm downloads](https://img.shields.io/npm/dm/@selemondev/create-vue3-app?color=00DC82&labelColor=020420)](https://npm.chart.dev/@selemondev/create-vue3-app)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@selemondev/create-vue3-app?color=00DC82&labelColor=020420)](https://bundlephobia.com/package/@selemondev/create-vue3-app)
[![install size](https://badgen.net/packagephobia/install/@selemondev/create-vue3-app?color=00DC82&labelColor=020420)](https://packagephobia.com/result?p=@selemondev/create-vue3-app)
[![license](https://img.shields.io/github/license/selemondev/create-vue3-app?color=00DC82&labelColor=020420)](https://github.com/selemondev/create-vue3-app/blob/master/LICENSE)

<!-- /automd -->

[![CI](https://github.com/selemondev/create-vue3-app/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/selemondev/create-vue3-app/actions/workflows/ci.yml)

</div>

Create a Vue 3 project powered by Vite, with the tools you choose.

## Usage

Use Node.js 24 LTS for compatibility with all available tools.

Run the CLI and follow the prompts:

```sh
npx @selemondev/create-vue3-app@latest
```

Or provide a project name and your preferred options:

```sh
npx @selemondev/create-vue3-app@latest my-app --ts --eslint --tailwind --use-pnpm
cd my-app
pnpm dev
```

To skip the prompts and install dependencies later:

```sh
npx @selemondev/create-vue3-app@latest my-app --yes --no-install
cd my-app
npm install
npm run dev
```

## Options

| Option | What it does |
| --- | --- |
| `--ts`, `--typescript` | Use TypeScript |
| `--no-typescript` | Use JavaScript |
| `--tailwind`, `--eslint` | Add Tailwind CSS or ESLint |
| `--router`, `--pinia` | Add Vue Router or Pinia |
| `--vueuse`, `--query` | Add VueUse or TanStack Vue Query |
| `--devtools`, `--vitest` | Add Vue DevTools or Vitest |
| `--use-npm`, `--use-pnpm`, `--use-yarn`, `--use-bun` | Install dependencies with your chosen package manager |
| `--no-install` | Create the project without installing dependencies |
| `--deploy vercel`, `--deploy netlify` | Add deployment configuration; does not deploy |
| `--git` | Initialize Git and create an initial commit |
| `-y`, `--yes` | Skip prompts and use defaults for unspecified choices |
| `--force` | Allow replacing generated files in an existing directory |

Use `--no-<feature>` to disable a feature, for example `--no-tailwind` or `--no-router`. Defaults include TypeScript, Tailwind CSS, Vue Router, Pinia, Vue Query, Vue DevTools, and Vitest.

For all available options:

```sh
npx @selemondev/create-vue3-app@latest --help
```

## Contributing

Bug reports and pull requests are welcome. See the [Contributing Guide](CONTRIBUTING.md) to get started.
