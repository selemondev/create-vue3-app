import type { StdioOptions } from 'node:child_process';
import spawn from 'cross-spawn';

export const createSpawnCmd = (dest: string | undefined, stdio: StdioOptions = 'inherit') => {
  return function (cmd: string, args: string[]): Promise<void> {
    // Node 20 lacks Promise.withResolvers; keep the supported runtime floor.
    return new Promise((resolve, reject) => {
      const child = spawn(cmd, args, { cwd: dest, stdio });
      child.once('error', (cause) => {
        reject(new Error(`Could not start ${cmd}. Check that it is installed and available on PATH.`, { cause }));
      });
      child.once('close', (code, signal) => {
        if (code === 0) resolve();
        else reject(new Error(`${cmd} failed with ${signal ? `signal ${signal}` : `exit code ${code}`}. See the command output above.`));
      });
    });
  };
};