import js from '@eslint/js'
import { globalIgnores } from 'eslint/config'
import pluginVue from 'eslint-plugin-vue'
import { withVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import globals from 'globals'

export default withVueTs(
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/.netlify/**', '**/.vercel/**']),
  { files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,vue}'] },
  js.configs.recommended,
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  {
    files: ['src/**/*.{js,jsx,mjs,ts,tsx,mts,vue}'],
    languageOptions: { globals: globals.browser }
  },
  {
    files: ['**/*.config.{js,mjs,cjs,ts,mts,cts}', '**/*.{test,spec}.{js,jsx,mjs,cjs,ts,tsx,mts,cts}'],
    languageOptions: { globals: globals.node }
  }
)
