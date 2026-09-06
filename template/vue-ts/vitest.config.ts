import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config.ts'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      passWithNoTests: true,
      exclude: [...configDefaults.exclude, '**/dist/**', '**/dist-ssr/**', 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url))
    }
  })
)
