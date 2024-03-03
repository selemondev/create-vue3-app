import { execSync } from 'child_process'
import { logger } from './logger'

export const shouldUseYarn = (): boolean => {
    try {
        const userAgent = process.env.npm_config_user_agent
        if (userAgent && userAgent.startsWith('yarn')) {
            return true
        }
        execSync('yarnpkg --version', { stdio: 'ignore' })
        return true
    } catch (err) {
        if (err instanceof Error) {
            logger.error(err.message);
        };

        return false;
    }
}
