import type { StdioOptions } from "child_process";
import { spawn } from "child_process";

export const createSpawnCmd = (dest: string | undefined, stdio: StdioOptions = 'inherit') => {
    return function (cmd: string, args: string[]): Promise<unknown> {
        const ls = spawn(cmd, args, {
            cwd: dest,
            stdio: stdio,
            shell: true
        });

        return new Promise((resolve, reject) => {
            ls.on('close', (code: number) => {
                code === 0 ? resolve(true) : reject(false);
            })
        }).catch((err) => {
            return err;
        })
    }
}