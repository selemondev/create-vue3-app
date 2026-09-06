import type { Options } from '../core/utils/vue/options';

export const packageManagerExecutable = (packageManager: Options['package']) => {
  switch (packageManager) {
    case 'yarn':
      return { command: 'yarn', args: ['dlx'] };
    case 'pnpm':
      return { command: 'pnpm', args: ['dlx'] };
    case 'bun':
      return { command: 'bunx', args: [] };
    default:
      return { command: 'npx', args: ['--yes'] };
  }
};
