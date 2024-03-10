import options from '../../utils/vue/options'
import prompts from 'prompts'
import type { PromptObject } from 'prompts'

export default async function createQuestion(question: PromptObject) {
  const result = await prompts(question, {
    onCancel: () => {
      throw new Error('❌ ' + ' Operation cancelled')
    }
  })
  Object.assign(options, result)

  return Promise.resolve(options)
};