/* eslint-disable no-console */
import * as esbuild from 'esbuild';
import nodeFsProm from 'node:fs/promises';
import nodePath from 'node:path';
import { fileURLToPath } from 'node:url';

// Helper to parse tsconfig paths and convert to esbuild alias format
async function getTsConfigPaths() {
  const tsConfig = JSON.parse(
    await nodeFsProm.readFile(
      fileURLToPath(import.meta.resolve('./tsconfig.json')),
      'utf-8',
    ),
  );

  const paths = tsConfig?.compilerOptions?.paths ?? {};
  const alias = {};

  for (const [key, values] of Object.entries(paths)) {
    // Convert "@/*" to "@" and remove the trailing /*
    const aliasKey = key.replace('/*', '');
    // Get the first value and remove trailing /*
    const aliasValue = values[0].replace('/*', '');
    alias[aliasKey] = nodePath.resolve(aliasValue);
  }

  return alias;
}

try {
  await esbuild.build({
    entryPoints: [fileURLToPath(import.meta.resolve('./src/server.ts'))],
    bundle: true,
    outdir: fileURLToPath(import.meta.resolve('./dist')),
    outExtension: { '.js': '.js' },
    format: 'esm',
    platform: 'node',
    target: 'ES2022',
    sourcemap: true,
    alias: await getTsConfigPaths(),
    packages: 'external',
  });
  console.info('🎉 Build completed successfully!');
} catch (error) {
  console.error('⛔ Build failed:', error);
  process.exit(1);
}
