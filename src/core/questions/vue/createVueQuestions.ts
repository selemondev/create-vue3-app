import packageManager from './packageManager'
import projectName from './projectName'
import deploy from './deploy'
import { runPrompt } from '.'
import createQuestion from './createQuestion'
import initializeGit from "./initGit"
import { logger } from '../../../utils/logger'
async function createVueQuestions(): Promise<void> {
  try {
    await createQuestion(projectName)
    await runPrompt();
    await createQuestion(packageManager)
    await createQuestion(deploy)
    await createQuestion(initializeGit);
  } catch (error) {
    // cancel
    if(error instanceof Error) {
        logger.error(error.message)
        process.exit(1)
    }
  }

  return Promise.resolve()
}

export default createVueQuestions