import prompts from './prompts'
import options from '../../utils/vue/options'
import {
  lintMap,
  packageJsonMap,
} from '../../utils/vue/ejsMapConstant'
import createQuestion from '../../../utils/question'

async function getVueProperty() {
  const Eslint = packageJsonMap.get('eslintPlugin')
  const Prettier = packageJsonMap.get('prettier')
  const Router = packageJsonMap.get('router')
  const Pinia = packageJsonMap.get('pinia')
  const Tailwind = packageJsonMap.get('tailwind');
  const TypeScript = packageJsonMap.get('typescript');
  const JavaScript = packageJsonMap.get('javascript');

  resolveOptions(options, packageJsonMap)

  resolveOptions(options, lintMap)

  options.constantDevDeps = packageJsonMap.get('constantDevDeps')
  
  options.constantProDeps = packageJsonMap.get('constantProDeps')

  options.EslintWithPrettierScript = packageJsonMap.get('eslintWithPrettier')

  options.Eslint = Eslint

  options.Prettier = Prettier

  options.Router = Router

  options.Pinia = Pinia

  options.Tailwind = Tailwind;

  options.TypeScript = TypeScript

  options.JavaScript = JavaScript

  options.useJavaScript = options.useTypeScript === false;

  return Promise.resolve(true)
}
export async function runPrompt() {

  await createQuestion(prompts)

  await getVueProperty()
}

function resolveOptions(originOptions, configMap: Map<any, any>) {
  Array.from(configMap.keys()).forEach((item: any) => {
    originOptions[item] = configMap.get(item)
  })
}
