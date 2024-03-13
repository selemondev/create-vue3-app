#!/usr/bin/env node

import program from './core/program'
import createVueNext from './core/command/create-vue-next';
import packageJson from "../package.json"
import options from './core/utils/vue/options';

async function main() {
      program
            .arguments('<project-name>')
            .version(packageJson.version)
            .description(`Create Vue Next. The Next Generation Vue Scaffolding Tool ⚡`)
            .action((name: string) => {
                  options.name = name.trim();
            })
            .option(
                  '--ts, --typescript',
                  `
  
      Initialize as a TypeScript project.
    `
            )
            .option(
                  '--tailwind',
                  `
      
      Initialize with Tailwind CSS config. (default)
    `
            )
            .option(
                  '--eslint',
                  `
  
      Initialize with eslint config.
    `
            )
            .option(
                  '--use-npm',
                  `
    
      Explicitly tell the CLI to bootstrap the application using npm
    `
            )
            .option(
                  '--use-pnpm',
                  `
    
      Explicitly tell the CLI to bootstrap the application using pnpm
    `
            )
            .option(
                  '--use-yarn',
                  `
    
      Explicitly tell the CLI to bootstrap the application using Yarn
    `
            )
            .option(
                  '--use-bun',
                  `

      Explicitly tell the CLI to bootstrap the application using Bun
    `
            )
            .allowUnknownOption()
            .parse(process.argv);
            options.useTypeScript = program.opts().typescript;
            options.useTailwind = program.opts().tailwind;
            options.useEslint = program.opts().eslint;
            options.package = !!program.opts().useNpm ? 'npm' : !!program.opts().usePnpm ? 'pnpm' : !!program.opts().useYarn ? 'yarn' : !!program.opts().useBun ? 'bun' : options.package;
            await createVueNext();

}
main();