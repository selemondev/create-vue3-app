import { Command } from 'commander'
const program = new Command()

export default program


// const program = new Commander.Command(packageJson.name)
//     .description(packageJson.description)
//     .arguments('<project-directory>')
//     .option(
//         '--ts', '--typescript',
//         'Initialize as a TypeScript project'
//     )
//     .option(
//         '--js', '--javascript',
//         'Initialize as a JavaScript project'
//     )
//     .option(
//         '--tw', '--tailwind',
//         'Initialize as a Tailwind project'
//     )
//     .option(
//         '--router', '--vue-router',
//         'Initialize with Vue Router'
//     )
//     .option(
//         '--use-npm',
//         'BootStrap project with npm'
//     )
//     .option(
//         '--use-pnpm',
//         'BootStrap project with yarn'
//     )
//     .option(
//         '--use-pnpm',
//         'BootStrap project with pnpm'
//     )
//     .option(
//         '--use-bun',
//         'BootStrap project with bun'
//     )
//     .option(
//         '--reset-preferences',
//         `
//       Explicitly tell the CLI to reset any stored preferences
//     `
//     )
//     .allowUnknownOption()
//     .parse(process.argv);

// export default program