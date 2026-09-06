import assert from 'node:assert/strict';
import { test } from 'node:test';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, mkdirSync, existsSync, rmSync, symlinkSync, cpSync } from 'node:fs';
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

test('force never writes through a nested destination symlink', (context) => {
  if (process.platform === 'win32') return context.skip('Creating symlinks requires Windows privileges.');
  const cwd = workspace(context);
  mkdirSync(join(cwd, 'outside'));
  writeFileSync(join(cwd, 'outside/main.ts'), 'keep me');
  mkdirSync(join(cwd, 'my-app'));
  symlinkSync(join(cwd, 'outside'), join(cwd, 'my-app/src'), 'dir');
  const result = run(cwd, ['my-app', '--yes', '--no-install', '--force']);
  assert.equal(result.status, 1);
  assert.equal(readFileSync(join(cwd, 'outside/main.ts'), 'utf8'), 'keep me');
  assert.ok(!existsSync(join(cwd, 'my-app/package.json')));
});

test('force replaces generated files but preserves unrelated files and Git', (context) => {
  const cwd = workspace(context);
  mkdirSync(join(cwd, 'my-app/.git'), { recursive: true });
  writeFileSync(join(cwd, 'my-app/.git/keep'), 'git state');
  writeFileSync(join(cwd, 'my-app/notes.txt'), 'user notes');
  writeFileSync(join(cwd, 'my-app/package.json'), 'old package');
  const result = run(cwd, ['my-app', '--yes', '--no-install', '--force']);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.equal(JSON.parse(readFileSync(join(cwd, 'my-app/package.json'), 'utf8')).name, 'my-app');
  assert.equal(readFileSync(join(cwd, 'my-app/.git/keep'), 'utf8'), 'git state');
  assert.equal(readFileSync(join(cwd, 'my-app/notes.txt'), 'utf8'), 'user notes');
});

test('rendering failure leaves an existing project unchanged', (context) => {
  const cwd = workspace(context);
  const fixture = join(cwd, 'cli');
  cpSync(resolve('dist'), join(fixture, 'dist'), { recursive: true });
  cpSync(resolve('template'), join(fixture, 'template'), { recursive: true });
  writeFileSync(join(fixture, 'package.json'), '{"type":"module"}');
  symlinkSync(resolve('node_modules'), join(fixture, 'node_modules'), 'junction');
  writeFileSync(join(fixture, 'template/vue-ts/package.ejs'), '{ invalid json');
  mkdirSync(join(cwd, 'my-app/src'), { recursive: true });
  writeFileSync(join(cwd, 'my-app/package.json'), 'original package');
  writeFileSync(join(cwd, 'my-app/src/App.vue'), 'original app');
  const result = spawnSync(process.execPath, [join(fixture, 'dist/index.js'), 'my-app', '--yes', '--no-install', '--force'], { cwd, encoding: 'utf8', env: { ...process.env, CI: '1' }, timeout: 10000 });
  assert.equal(result.status, 1);
  assert.equal(readFileSync(join(cwd, 'my-app/package.json'), 'utf8'), 'original package');
  assert.equal(readFileSync(join(cwd, 'my-app/src/App.vue'), 'utf8'), 'original app');
  assert.ok(!existsSync(join(cwd, 'my-app/.gitignore')));
});
