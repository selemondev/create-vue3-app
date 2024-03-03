import { execSync } from "child_process";
import { logger } from "./logger";
export const shouldUsePnpm = (): boolean => {
    try {
        const userAgent = process.env.config_user_agent;

        if (userAgent && userAgent.startsWith('pnpm')) {
            return true;
        };

        execSync('pnpm --version', { stdio: 'ignore' });

        return true;
    } catch(err){
        if(err instanceof Error) {
            logger.error(err.message);
        };

        return false;
    }
}