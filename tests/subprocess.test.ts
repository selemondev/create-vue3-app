import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createSpawnCmd } from '../src/utils/createSpawnCmd';

test('nonzero subprocess exits reject instead of reporting success', async () => {
  await assert.rejects(createSpawnCmd(undefined, 'ignore')(process.execPath, ['-e', 'process.exit(7)']), /7/);
});

test('missing executables reject with a useful error', async () => {
  await assert.rejects(createSpawnCmd(undefined, 'ignore')('create-vue3-app-missing-executable', []), /create-vue3-app-missing-executable/);
});

test('subprocess arguments remain literal rather than shell expressions', async (context) => {
  const cwd = await mkdtemp(join(tmpdir(), 'vue-spawn-'));
  context.after(() => rm(cwd, { recursive: true, force: true }));
  await createSpawnCmd(cwd, 'ignore')(process.execPath, ['-e', 'require(\"node:fs\").writeFileSync(\"argument\", process.argv[1])', 'a b; $(exit 9)']);
  assert.equal(await readFile(join(cwd, 'argument'), 'utf8'), 'a b; $(exit 9)');
});
