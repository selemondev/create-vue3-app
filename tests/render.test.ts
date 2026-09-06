import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { ejsRender } from '../src/utils/ejsRender';
import options from '../src/core/utils/vue/options';

test('invalid generated code rejects without replacing the existing output', async (context) => {
  const directory = await mkdtemp(join(tmpdir(), 'vue-render-'));
  context.after(async () => { options.dest = undefined; await rm(directory, { recursive: true, force: true }); });
  options.dest = directory;
  await writeFile(join(directory, 'package.ejs'), '{ invalid json');
  await writeFile(join(directory, 'package.json'), 'original');
  await assert.rejects(ejsRender('package.json', directory), /package\.json/);
  assert.equal(await readFile(join(directory, 'package.json'), 'utf8'), 'original');
  assert.equal(await readFile(join(directory, 'package.ejs'), 'utf8'), '{ invalid json');
});
