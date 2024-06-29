import prompts from './prompts'
import options from '../../utils/vue/options'
import {
  lintMap,
  packageJsonMap,
} from '../../utils/vue/ejsMapConstant'
import createQuestion from './createQuestion';

async function getVueProperty() {
  const Eslint = packageJsonMap.get('eslintJsVue');
  const EslintTs = packageJsonMap.get('eslintTsPlugin');
  const Vitest = packageJsonMap.get('vitest');
  const TanStackVueQuery = packageJsonMap.get('tanStackVueQuery');
  const Router = packageJsonMap.get('router');
  const Pinia = packageJsonMap.get('pinia');
  const Tailwind = packageJsonMap.get('tailwind');
  const TypeScript = packageJsonMap.get('typescript');
  const JavaScript = packageJsonMap.get('javascript');
  const DevTool = packageJsonMap.get('devTool');
  const VueUse = packageJsonMap.get('vueUse');

  resolveOptions(options, packageJsonMap)

  resolveOptions(options, lintMap)

  options.constantDevDeps = packageJsonMap.get('constantDevDeps')
  
  options.constantProDeps = packageJsonMap.get('constantProDeps')

  options.Eslint = options.useTypeScript ? EslintTs : Eslint

  options.Vitest = Vitest

  options.DevTool = DevTool;

  options.Router = Router;

  options.TanStackVueQuery = TanStackVueQuery

  options.Pinia = Pinia

  options.VueUse = VueUse;

  options.Tailwind = Tailwind;

  options.TypeScript = TypeScript

  options.JavaScript = JavaScript

  options.useEslintTs = options.useTypeScript

  options.useJavaScript = options.useTypeScript === false;

  return Promise.resolve(true)
}
export async function runPrompt() {

  await createQuestion(prompts)

  await getVueProperty()
}

function resolveOptions(originOptions: any, configMap: Map<string, string>) {
  Array.from(configMap.keys()).forEach((item: string) => {
    originOptions[item] = configMap.get(item)
  })
}
