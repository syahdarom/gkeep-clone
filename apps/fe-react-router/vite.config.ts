import { reactRouter } from '@react-router/dev/vite';
import viteTailwindCss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [viteTailwindCss(), reactRouter(), viteTsconfigPaths()],
});
