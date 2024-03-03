import PackageDevice from './packageManager'
import projectName from './projectName'
import { frameQuestions } from '../../../compile/common/frameQuestions'
import createQuestion from '../../../utils/question'
import { logger } from '../../../utils/logger'
async function createVueQuestions(): Promise<void> {
  try {
    await createQuestion(projectName)
    await createQuestion(PackageDevice)
    await frameQuestions.get('vue')()
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