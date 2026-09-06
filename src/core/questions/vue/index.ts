import options from '../../utils/vue/options';
import { lintMap, packageJsonMap } from '../../utils/vue/ejsMapConstant';

export async function runPrompt(): Promise<void> {
  options.constantDevDeps = packageJsonMap.get('constantDevDeps');
  options.constantProDeps = packageJsonMap.get('constantProDeps');
  options.Eslint = packageJsonMap.get(options.useTypeScript ? 'eslintTsPlugin' : 'eslintJsVue');
  options.Vitest = packageJsonMap.get('vitest');
  options.DevTool = packageJsonMap.get('devTool');
  options.Router = packageJsonMap.get('router');
  options.TanStackVueQuery = packageJsonMap.get('tanStackVueQuery');
  options.Pinia = packageJsonMap.get('pinia');
  options.VueUse = packageJsonMap.get('vueUse');
  options.Tailwind = packageJsonMap.get('tailwind');
  options.TypeScript = packageJsonMap.get('typescript');
  options.JavaScript = packageJsonMap.get('javascript');
  options.EslintScript = lintMap.get('EslintScript');
  options.VitestScript = lintMap.get('VitestScript');
  options.TypeScriptScript = lintMap.get('TypeScriptScript');
  options.VercelCLI = packageJsonMap.get('vercelCLI');
  options.NetlifyCLI = packageJsonMap.get('netlifyCLI');
  options.useVercelCLI = options.deploy === 'vercel';
  options.useNetlifyCLI = options.deploy === 'netlify';
  options.useEslintTs = options.useTypeScript;
  options.useJavaScript = !options.useTypeScript;
}
