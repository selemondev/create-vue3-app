import * as dependencies from '../../../deps/vue/dependencies'
interface Dependency {
  name: string | string[],
  version: string | string[]
};

interface Dependencies {
  [key: string]: Dependency
}
const packageJsonMap = new Map();
const deps: Dependencies = dependencies;
Object.keys(deps).forEach((item: string) => {
  const name = deps[item].name;
  if (Array.isArray(name)) {
    let res = ''
    name.forEach((cur: string, index: number) => {
      res += `"${cur}":"${deps[item].version[index]}",`
    })
    packageJsonMap.set(item, res)
  } else {
    packageJsonMap.set(
      item,
      `"${deps[item].name}":"${deps[item].version}",`
    )
  }
})

const lintMap = new Map([
  [
    'EslintScript',
    '"lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",'
  ],
  [
    'PrettierScript',
    '"prettier": "prettier --write ./**/*.{html,vue,ts,js,json,md}",'
  ],

  [
    'VitestScript',
    '"test:unit": "vitest",'
  ],

  [
    'TypeScriptScript',
    '"type-check": "vue-tsc --noEmit"'
  ]
])


export {
  lintMap,
  packageJsonMap
}
