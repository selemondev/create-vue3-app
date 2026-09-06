import fs from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import options from '../../utils/vue/options';
import { ejsRender } from '../../../utils/ejsRender';
import { templateFilesMap } from '../../utils/vue/templateFile';
import { getFilterFile } from '../../../filter/filterFiles';
import { progress } from '../../../utils/logger';

export default async function copyTemplate(): Promise<void> {
  await progress('Creating project files', async () => {
    const language = options.useTypeScript ? 'vue-ts' : 'vue-js';
    const directory = path.dirname(fileURLToPath(import.meta.url));
    const packaged = path.resolve(directory, '../template', language);
    const source = path.resolve(directory, '../../../../template', language);
    options.src = await fs.pathExists(packaged) ? packaged : source;
    if (!options.dest || !options.name) throw new Error('A project directory is required.');
    await fs.copy(options.src, options.dest);
    await getFilterFile()?.();
    await fs.move(path.join(options.dest, '.gitignore.ejs'), path.join(options.dest, '.gitignore'), { overwrite: true });
    await Promise.all(templateFilesMap.get('vue')().map((file: string) => ejsRender(file, options.name ?? '')));
  });
}
