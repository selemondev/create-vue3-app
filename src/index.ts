#!/usr/bin/env node

import { Option } from 'commander';
import program from './core/program';
import packageJson from '../package.json';
import options from './core/utils/vue/options';

interface Flags {
  typescript?: boolean;
  tailwind?: boolean;
  eslint?: boolean;
  router?: boolean;
  pinia?: boolean;
  vueuse?: boolean;
  query?: boolean;
  devtools?: boolean;
  vitest?: boolean;
  git?: boolean;
  install?: boolean;
  useNpm?: boolean;
  usePnpm?: boolean;
  useYarn?: boolean;
  useBun?: boolean;
  deploy?: 'none' | 'vercel' | 'netlify';
  yes?: boolean;
  updateDeps?: boolean;
  force?: boolean;
}

async function main() {
  const [major, minor] = process.versions.node.split('.').map(Number);
  if (!(major === 20 && minor >= 19 || major === 22 && minor >= 12 || major > 22)) {
    console.error(`Create Vue 3 App requires Node ${packageJson.engines.node}; found ${process.versions.node}.`);
    process.exitCode = 1;
    return;
  }
  program
    .version(packageJson.version)
    .description('Create a Vue 3 application with Vite and your choice of tools.')
    .argument('[project-name]', 'project directory (prompted when omitted in a terminal)')
    .option('--ts, --typescript', 'use TypeScript')
    .option('--no-typescript', 'use JavaScript')
    .option('--tailwind', 'add Tailwind CSS')
    .option('--no-tailwind', 'use plain CSS')
    .option('--eslint', 'add ESLint')
    .option('--no-eslint', 'skip ESLint')
    .option('--router', 'add Vue Router')
    .option('--no-router', 'skip Vue Router')
    .option('--pinia', 'add Pinia')
    .option('--no-pinia', 'skip Pinia')
    .option('--vueuse', 'add VueUse')
    .option('--no-vueuse', 'skip VueUse')
    .option('--query', 'add TanStack Vue Query')
    .option('--no-query', 'skip TanStack Vue Query')
    .option('--devtools', 'add Vue DevTools')
    .option('--no-devtools', 'skip Vue DevTools')
    .option('--vitest', 'add Vitest unit testing')
    .option('--no-vitest', 'skip unit testing')
    .option('--use-npm', 'install dependencies with npm')
    .option('--use-pnpm', 'install dependencies with pnpm')
    .option('--use-yarn', 'install dependencies with Yarn')
    .option('--use-bun', 'install dependencies with Bun')
    .option('--update-deps', 'opt in to latest dependency majors before installing (requires npx)')
    .option('--install', 'install dependencies with the invoking package manager')
    .option('--no-install', 'create files only; do not install dependencies')
    .addOption(new Option('--deploy <target>', 'prepare deployment configuration (does not deploy)').choices(['none', 'vercel', 'netlify']))
    .option('--git', 'initialize Git and create an initial commit')
    .option('--no-git', 'skip Git initialization')
    .option('-y, --yes', 'accept defaults for unanswered questions (never implies --force)')
    .option('--force', 'allow replacing generated files in an existing directory')
    .allowUnknownOption()
    .allowExcessArguments()
    .addHelpText('after', '\nExamples:\n  npx @selemondev/create-vue3-app my-app\n  npx @selemondev/create-vue3-app my-app --ts --eslint --tailwind --use-pnpm\n  npx @selemondev/create-vue3-app my-app --yes --no-install\n\nWithout a terminal, supply a project name; unanswered choices use the guided defaults.\nDefaults: TypeScript, Tailwind, Router, Pinia, Query, DevTools, Vitest; no ESLint, VueUse, Git, deployment or installation.\nLegacy package-manager precedence: npm, pnpm, yarn, bun. Unknown flags remain ignored.');

  program.parse(process.argv);
  const flags = program.opts<Flags>();
  options.name = program.args[0];
  options.useTypeScript = flags.typescript;
  options.useTailwind = flags.tailwind;
  options.useEslint = flags.eslint;
  options.useRouter = flags.router;
  options.usePinia = flags.pinia;
  options.useVueUse = flags.vueuse;
  options.useTanStackVueQuery = flags.query;
  options.useDevTool = flags.devtools;
  options.useVitest = flags.vitest;
  options.useGitInit = flags.git;
  options.install = flags.install;
  options.deploy = flags.deploy;
  options.yes = flags.yes;
  options.force = flags.force;
  options.updateDeps = flags.updateDeps;
  options.package = flags.useNpm ? 'npm' : flags.usePnpm ? 'pnpm' : flags.useYarn ? 'yarn' : flags.useBun ? 'bun' : undefined;
  // Defer scaffolding and its formatter until after the help/version fast path.
  const { default: createVueNext } = await import('./core/command/create-vue-next');
  await createVueNext();
}

main().catch(async (cause) => {
  // Error UI is also unnecessary on a successful help/version fast path.
  const { logger, Cancellation } = await import('./utils/logger');
  if (cause instanceof Cancellation) logger.cancel();
  else logger.error(cause instanceof Error ? cause.message : 'Project creation failed.');
  process.exitCode = 1;
});
