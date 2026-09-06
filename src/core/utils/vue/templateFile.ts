import options from './options'

export function vueFetchTemplateFiles(): string[] {
  const files = [
    'package.json',
    options.useTypeScript ? 'src/main.ts' : 'src/main.js',
    'src/App.vue',
    options.useTypeScript ? 'vite.config.ts' : 'vite.config.js',
    'src/components/TheWelcome.vue'
  ]
  return files;
}
