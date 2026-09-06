import assert from 'node:assert/strict';
import { test } from 'node:test';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const executable = resolve('dist/index.js');
function run(cwd: string, args: string[]) {
  return spawnSync(process.execPath, [executable, ...args], { cwd, encoding: 'utf8', timeout: 10000, env: { ...process.env, CI: '1', NO_COLOR: '1' } });
}
function workspace(context: { after: (fn: () => void) => void }) {
  const cwd = mkdtempSync(join(tmpdir(), 'vue-cli-'));
  context.after(() => rmSync(cwd, { recursive: true, force: true }));
  return cwd;
}

test('version is clean and usable without package managers on PATH', (context) => {
  const cwd = workspace(context);
  const result = spawnSync(process.execPath, [executable, '--version'], { cwd, encoding: 'utf8', env: { ...process.env, PATH: '', NO_COLOR: '1' } });
  assert.equal(result.status, 0);
  assert.equal(result.stdout, '0.0.11\n');
  assert.equal(result.stderr, '');
});

test('missing unattended project name fails with guidance', (context) => {
  const result = run(workspace(context), []);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /project.*name/i);
});

test('legacy flags scaffold TypeScript unattended without installation', (context) => {
  const cwd = workspace(context);
  const result = run(cwd, ['my-app', '--ts', '--eslint', '--tailwind', '--use-pnpm', '--no-install', '--no-git', '--deploy', 'none']);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  const manifest = JSON.parse(readFileSync(join(cwd, 'my-app/package.json'), 'utf8'));
  assert.equal(manifest.name, 'my-app');
  assert.ok(manifest.devDependencies.typescript);
  assert.ok(existsSync(join(cwd, 'my-app/src/main.ts')));
  assert.ok(!existsSync(join(cwd, 'my-app/node_modules')));
});

test('existing positional destination requires explicit force', (context) => {
  const cwd = workspace(context);
  mkdirSync(join(cwd, 'my-app'));
  writeFileSync(join(cwd, 'my-app/package.json'), 'keep me');
  const result = run(cwd, ['my-app', '--yes', '--no-install']);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /--force/);
  assert.equal(readFileSync(join(cwd, 'my-app/package.json'), 'utf8'), 'keep me');
});
