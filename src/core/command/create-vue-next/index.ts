import program from '../../program'
import createVueQuestions from '../../questions/vue/createVueQuestions'
import initialLog from '../create-vue-next/initialLog'
import installDeps from '../create-vue-next/install'
import copyTemplate from '../create-vue-next/copyTemplate'
import packageJson from "../../../../package.json"
import options from '../../utils/vue/options'
async function createProject() {
  await initialLog()
  await createVueQuestions()
  await copyTemplate()
  await installDeps();
}
export default async function createVueNext() {
  program
    .name(packageJson.name)
    .arguments('<project-name>')
    .version(packageJson.version)
    .description(`Create Vue Next. The Next Generation Vue Scaffolding Tool ⚡`)
    .action((name: string) => {
      options.name = name.trim()
    })
    .option(
      '--ts, --typescript',
      `

    
    Initialize as a TypeScript project.
  `
    )
    .option(
      '--js, --javascript',
      `

    
    Initialize as a JavaScript project.
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
}
