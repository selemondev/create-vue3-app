#!/usr/bin/env node

import program from './core/program'
import createVueNext from './core/command/create-vue-next';

async function createViteCliCommand() {
      await createVueNext()
      program.parse(process.argv);
}
createViteCliCommand()



// import options from "./compile/vue/options";
// import { getPackageManager } from "./utils/getPackageManager";
// import prompts from 'prompts';
// import { onPromptState } from "./utils/getOnPromptState";
// import { isValidProjectName } from "./utils/getValidProjectName";
// import viteCliCoreCommand from './core/command'
// import { logger } from './utils/logger';
// import Conf from "conf";
// import program from "./core/program";


// const PackageManager = !!program.useNpm ? 'npm' : !!program.usePnpm ? 'pnpm' : !!program.useYarn ? 'yarn' : !!program.useBun ? 'bun' : getPackageManager()

// let projectName = '';

// const handleSigTerm = () => process.exit(0);

// process.on('SIGINT', handleSigTerm);
// process.on('SIGTERM', handleSigTerm)

// async function run(): Promise<void> {

//     // console.clear();

//     // logger.info('Welcome To Create Vue Next. The Next Generation Vue Scaffolding Tool ✨');

//     // console.log();

//     await viteCliCoreCommand()


//     // const conf = new Conf({ projectName: 'create-vue-next' });

//     // if (typeof projectName === 'string') {
//     //     projectName = projectName.trim();
//     //     options.name = projectName;
//     // };

//     // if (program.args[0]) {
//     //     const isProjectNameValid = isValidProjectName(program.args[0]);

//     //     if (isProjectNameValid.valid) {
//     //         projectName = program.args[0];
//     //         options.name = projectName;
//     //     } else {
//     //         logger.error(`Invalid project name. Could not create a project called ${program.args[0]} because of npm naming restrictions:`);
//     //         process.exit(1);
//     //     }

//     // }

//     // if (!projectName) {
//     //     const { name } = await prompts({
//     //         onState: onPromptState,
//     //         type: 'text',
//     //         name: 'name',
//     //         initial: 'create-vue-next',
//     //         message: 'What should we call your project?',
//     //         validate: (value) => {
//     //             const isProjectNameValid = isValidProjectName(value);

//     //             if (isProjectNameValid.valid) {
//     //                 return true;
//     //             }
//     //             return 'Invalid project name'
//     //         },
//     //     });

//     //     projectName = name;
//     // }

//     // if (!options.name) {
//     //     logger.error('Please provide the project name')
//     // }

//     // const response = await prompts([
//     //     {
//     //         onState: onPromptState,
//     //         type: 'text',
//     //         name: 'name',
//     //         initial: 'create-react-next',
//     //         message: 'What should we call your project?',
//     //         validate: (value) => {
//     //             const isProjectNameValid = isValidProjectName(value);

//     //             if (isProjectNameValid.valid) {
//     //                 return true;
//     //             }
//     //             return 'Invalid project name'
//     //         },
//     //     },

//     //     {
//     //         type: prev => prev && 'toggle',
//     //         name: 'tailwind',
//     //         initial: true,
//     //         active: 'yes',
//     //         inactive: 'no',
//     //         message: 'Add TailwindCss?',
//     //     },

//     //     {
//     //         type: prev => prev && 'toggle',
//     //         name: 'typescript',
//     //         initial: true,
//     //         active: 'yes',
//     //         inactive: 'no',
//     //         message: 'Add TypeScript?',
//     //     },


//     //     {
//     //         type: prev => prev && 'toggle',
//     //         name: 'pinia',
//     //         initial: false,
//     //         active: 'yes',
//     //         inactive: 'no',
//     //         message: 'Add Pinia?',
//     //     },

//     //     {
//     //         type: prev => prev && 'toggle',
//     //         name: 'router',
//     //         initial: true,
//     //         active: 'yes',
//     //         inactive: 'no',
//     //         message: 'Add Vue Router?',
//     //     },
//     // ]);

//     console.log();
// }

// run();