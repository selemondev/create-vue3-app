import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

export default defineConfig(
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/.netlify/**', '**/.vercel/**']),
  {
    files: ['**/*.{js,jsx,mjs,cjs,vue}'],
    extends: [js.configs.recommended, pluginVue.configs['flat/essential']],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } }
    }
  },
  {
    files: ['src/**/*.{js,jsx,mjs,vue}'],
    languageOptions: { globals: globals.browser }
  },
  {
    files: ['**/*.config.{js,mjs,cjs}', '**/*.{test,spec}.{js,jsx,mjs,cjs}'],
    languageOptions: { globals: globals.node }
  }
)
