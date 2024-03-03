import options from './options'

const templateFilesMap = new Map()
templateFilesMap.set('vue', vueFetchTemplateFiles)
export function vueFetchTemplateFiles(): string[] | any[] {
  const files = [
    'package.json',
    options.useTypeScript ? 'src/main.ts' : 'src/main.js',
    'src/App.vue',
  ]
  return files.filter(Boolean)
}
export { templateFilesMap }
