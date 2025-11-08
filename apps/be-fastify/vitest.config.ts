import viteTsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    typecheck: {
      tsconfig: 'tsconfig.vitest.json',
    },
    setupFiles: ['./test/setup-files/vitest.setup-env.ts'],
  },
  plugins: [
    viteTsConfigPaths({
      configNames: ['tsconfig.vitest.json'],
    }),
  ],
});
