import { execSync } from "child_process";
import { logger } from "./logger";
export const shouldUseBun = (): boolean => {
    try {
        const userAgent = process.env.config_user_agent;

        if (userAgent && userAgent.startsWith('bun')) {
            return true;
        };

        execSync('bun --version', { stdio: 'ignore' });

        return true;
    } catch(err){
        if(err instanceof Error) {
            logger.error(err.message);
        };

        return false;
    }
}