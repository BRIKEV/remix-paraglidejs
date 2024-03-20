import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [],
  test: {
    environment: 'happy-dom',
    coverage: {
      provider: 'istanbul',
      exclude: ['node_modules', 'test', 'build', 'coverage', 'vitest.config.ts', 'examples'],
      reporter: ['html', 'lcov']
    }
  },
});