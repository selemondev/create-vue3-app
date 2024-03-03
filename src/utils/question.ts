import options from '../core/utils/vue/options'
import prompts from 'prompts'

export default async function createQuestion(question) {
  const result = await prompts(question, {
    onCancel: () => {
      throw new Error('❌' + ' Operation cancelled')
    }
  })
  Object.assign(options, result)

  return Promise.resolve(options)
};