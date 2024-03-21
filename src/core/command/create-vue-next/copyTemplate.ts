import fs from 'fs-extra'
import path from 'node:path'
import options from '../../../core/utils/vue/options'
import { ejsRender } from '../../../utils/ejsRender'
import chalk from "chalk"
import { templateFilesMap } from '../../../core/utils/vue/templateFile'
import { getFilterFile } from '../../../filter/filterFiles'
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import ora from 'ora'

async function copyTemplate() {
    const __filename = fileURLToPath(import.meta.url);

    const __dirname = dirname(__filename);

    const spinner = ora('Copying template...').start();

    const language = options.useTypeScript ? 'vue-ts' : 'vue-js';

    options.src = path.resolve(__dirname, `../template/${language}`);

    const dest = options.name && path.resolve(process.cwd(), options.name)
    
    options.dest = dest

    const templatePath = path.resolve(
        __dirname,
        `../../../../template/${language}`
    );
    options.templatePath = templatePath

    const filterFileFn = getFilterFile()

    async function copy() {
        const targetDirectory = path.resolve(__dirname, '../');
        if(!dest) {
            return;
        };
        await fs.copy(`${targetDirectory}/template/${language}`, dest)
    }
    await copy();

    filterFileFn && await filterFileFn();

    options.dest && await fs.move(
        path.resolve(options.dest, '.gitignore.ejs'),
        path.resolve(options.dest, '.gitignore'),
        { overwrite: true }
    );

   await Promise.all(
        templateFilesMap
            .get('vue')()
            .map((file: string) => options.name && ejsRender(file, options.name))
    )
    spinner.text = chalk.green('Template successfully copied!');
    
    spinner.succeed()
}
export default copyTemplate