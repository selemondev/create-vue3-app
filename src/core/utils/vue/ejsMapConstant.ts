import * as dependencies from "../../../deps/vue/dependencies";

export const packageJsonMap = new Map<string, string>();
for (const [key, dependency] of Object.entries(dependencies)) {
  const names = Array.isArray(dependency.name)
    ? dependency.name
    : [dependency.name];
  const versions = Array.isArray(dependency.version)
    ? dependency.version
    : [dependency.version];
  if (names.length !== versions.length)
    throw new Error(
      `Dependency group ${key} has mismatched names and versions.`,
    );
  packageJsonMap.set(
    key,
    names
      .map(
        (name, index) =>
          `${JSON.stringify(name)}:${JSON.stringify(versions[index])},`,
      )
      .join(""),
  );
}

export const lintScripts = {
  EslintScript: '"lint": "eslint . --fix",',
  VitestScript: '"test:unit": "vitest",',
  TypeScriptScript: '"type-check": "vue-tsc --build"',
};
