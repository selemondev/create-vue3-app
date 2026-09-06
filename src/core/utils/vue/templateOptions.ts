import options from "./options";
import { lintScripts, packageJsonMap } from "./ejsMapConstant";

export function prepareTemplateOptions(): void {
  options.constantDevDeps = packageJsonMap.get("constantDevDeps");
  options.constantProDeps = packageJsonMap.get("constantProDeps");
  options.Eslint = packageJsonMap.get(
    options.useTypeScript ? "eslintTsPlugin" : "eslintJsVue",
  );
  options.Vitest = packageJsonMap.get("vitest");
  options.DevTool = packageJsonMap.get("devTool");
  options.Router = packageJsonMap.get("router");
  options.TanStackVueQuery = packageJsonMap.get("tanStackVueQuery");
  options.Pinia = packageJsonMap.get("pinia");
  options.VueUse = packageJsonMap.get("vueUse");
  options.Tailwind = packageJsonMap.get("tailwind");
  options.TypeScript = packageJsonMap.get("typescript");
  options.JavaScript = packageJsonMap.get("javascript");
  options.EslintScript = lintScripts.EslintScript;
  options.VitestScript = lintScripts.VitestScript;
  options.TypeScriptScript = lintScripts.TypeScriptScript;
  options.VercelCLI = packageJsonMap.get("vercelCLI");
  options.NetlifyCLI = packageJsonMap.get("netlifyCLI");
  options.useVercelCLI = options.deploy === "vercel";
  options.useNetlifyCLI = options.deploy === "netlify";
  options.nodeEngine = "^20.19.0 || >=22.12.0";
  if (options.useVitest)
    options.nodeEngine = "^20.19.0 || ^22.12.0 || >=24.0.0";
  if (options.useEslint)
    options.nodeEngine = "^20.19.0 || ^22.13.0 || >=24.0.0";
  if (options.useNetlifyCLI)
    options.nodeEngine =
      options.useEslint || options.useVitest
        ? "^22.13.0 || >=24.0.0"
        : ">=22.13.0";
  options.useJavaScript = !options.useTypeScript;
}
