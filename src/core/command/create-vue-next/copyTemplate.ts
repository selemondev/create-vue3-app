import fs from 'fs-extra';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import options from '../../utils/vue/options';
import { ejsRender } from '../../../utils/ejsRender';
import { vueFetchTemplateFiles } from '../../utils/vue/templateFile';
import { getFilterFile } from '../../../filter/filterFiles';
import { progress } from '../../../utils/logger';

async function checkDestination(source: string, destination: string): Promise<void> {
  const target = await fs.lstat(destination).catch((cause: NodeJS.ErrnoException) => {
    if (cause.code === 'ENOENT') return undefined;
    throw cause;
  });
  if (!target) return;
  const original = await fs.lstat(source);
  if (target.isSymbolicLink() || original.isDirectory() !== target.isDirectory()) {
    throw new Error(`Cannot replace ${destination}: a file, directory or symbolic link conflicts with the template. Move it aside and try again.`);
  }
  if (original.isDirectory()) {
    for (const file of await fs.readdir(source)) await checkDestination(path.join(source, file), path.join(destination, file));
  } else if (!options.force) {
    throw new Error(`File ${destination} already exists. Use --force to replace generated files.`);
  }
}

export default async function copyTemplate(): Promise<void> {
  const destination = options.dest;
  const name = options.name;
  if (!destination || !name) throw new Error('A project directory is required.');
  await progress('Creating project files', async () => {
    const language = options.useTypeScript ? 'vue-ts' : 'vue-js';
    const directory = path.dirname(fileURLToPath(import.meta.url));
    const packaged = path.resolve(directory, '../template', language);
    const source = path.resolve(directory, '../../../../template', language);
    options.src = await fs.pathExists(packaged) ? packaged : source;
    const stage = await fs.mkdtemp(path.join(tmpdir(), 'create-vue3-app-'));
    try {
      options.dest = stage;
      await fs.copy(options.src, stage);
      await getFilterFile()?.();
      await fs.move(path.join(stage, '.gitignore.ejs'), path.join(stage, '.gitignore'));
      // Finish rendering before touching user files, including on formatter failure.
      for (const file of vueFetchTemplateFiles()) await ejsRender(file, name);
      await checkDestination(stage, destination);
      if (await fs.pathExists(destination)) await fs.copy(stage, destination, { overwrite: options.force === true, errorOnExist: true });
      else await fs.move(stage, destination, { overwrite: false });
    } finally {
      options.dest = destination;
      await fs.remove(stage);
    }
  });
}
