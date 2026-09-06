import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import spawn from 'cross-spawn';

const cli = fileURLToPath(new URL('../dist/index.js', import.meta.url));
const directory = await mkdtemp(join(tmpdir(), 'create-vue3-verify-'));
const minimal = ['--no-tailwind', '--no-router', '--no-pinia', '--no-query', '--no-devtools', '--no-vitest', '--no-eslint'];

function run(cwd, command, args) {
  const result = spawn.sync(command, args, { cwd, stdio: 'inherit', env: { ...process.env, CI: '1', NO_COLOR: '1' } });
  if (result.error) throw result.error;
  assert.equal(result.status, 0, `${command} ${args.join(' ')} failed in ${cwd}`);
}

try {
  for (const language of ['ts', 'js']) {
    for (const full of [true, false]) {
      const name = `${language}-${full ? 'full' : 'minimal'}`;
      const cwd = join(directory, name);
      run(directory, process.execPath, [cli, name, '--yes', '--no-install', language === 'ts' ? '--ts' : '--no-typescript', ...(full ? ['--eslint', '--vueuse'] : minimal)]);
      const manifest = JSON.parse(await readFile(join(cwd, 'package.json'), 'utf8'));
      assert.equal(manifest.name, name);
      run(cwd, 'npm', ['install', '--no-audit', '--no-fund']);
      run(cwd, 'npm', ['run', 'build']);
      if (language === 'ts') run(cwd, 'npm', ['run', 'type-check']);
      if (full) {
        run(cwd, 'npm', ['run', 'lint']);
        await mkdir(join(cwd, 'src/__tests__'), { recursive: true });
        await writeFile(join(cwd, `src/__tests__/counter.spec.${language}`), `import { expect, test } from 'vitest';\nimport { createPinia, setActivePinia } from 'pinia';\nimport { useCounterStore } from '../stores/counter';\ntest('counter updates its derived value', () => {\n  setActivePinia(createPinia());\n  const counter = useCounterStore();\n  counter.increment();\n  expect(counter.count).toBe(1);\n  expect(counter.doubleCount).toBe(2);\n});\n`);
        run(cwd, 'npm', ['run', 'test:unit', '--', '--run']);
        if (language === 'ts') run(cwd, 'npm', ['exec', '--', 'vue-tsc', '--build', 'tsconfig.vitest.json']);
      }
      console.log(`Verified ${name}`);
    }
  }
} finally {
  await rm(directory, { recursive: true, force: true });
}
