import packageManager from './packageManager'
import projectName from './projectName'
import deploy from './deploy'
import { runPrompt } from '.'
import createQuestion from './createQuestion'
import initializeGit from "./initGit"
import { logger } from '../../../utils/logger'
import options from '../../utils/vue/options'
import tailwindPrompt from "./tailwind";
import typeScriptPrompt from "./typescript";
import eslintPrompt from "./eslint"
async function createVueQuestions(): Promise<void> {
  try {
    if(!options.name) {
      await createQuestion(projectName)
    }
    if(!options.useTypeScript) {
      await createQuestion(typeScriptPrompt)
    }
    if(!options.useTailwind) {
      await createQuestion(tailwindPrompt)
    }
    await runPrompt();
    if(!options.useEslint) {
      await createQuestion(eslintPrompt)
    }
    if(!options.package) {
      await createQuestion(packageManager)
    }
    await createQuestion(deploy);

    await createQuestion(initializeGit);

  } catch (error) {

    if(error instanceof Error) {

        logger.error(error.message);

        process.exit(1);

    }
  }

  return Promise.resolve()
}

export default createVueQuestions