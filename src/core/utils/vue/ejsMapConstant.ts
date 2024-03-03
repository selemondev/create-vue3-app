import * as dependencies from '../../../deps/vue/dependencies'
const packageJsonMap = new Map()
Object.keys(dependencies).forEach((item) => {
  if (Array.isArray(dependencies[item].name)) {
    let res = ''
    dependencies[item].name.forEach((cur, index) => {
      res += `"${cur}":"${dependencies[item].version[index]}",`
    })
    packageJsonMap.set(item, res)
  } else {
    packageJsonMap.set(
      item,
      `"${dependencies[item].name}":"${dependencies[item].version}",`
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
    'TypeScriptScript',
    '"type-check": "vue-tsc --noEmit"'
  ]
])


export {
  lintMap,
  packageJsonMap
}
