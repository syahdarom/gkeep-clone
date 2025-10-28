import js from '@eslint/js';
import eslintCfgPrettier from 'eslint-config-prettier/flat';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['.turbo/', 'dist/']),
  {
    files: ['**/*.{js,cjs,ts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
    rules: {
      'no-console': 'error',
    },
  },
  tseslint.configs.recommended,
  {
    plugins: {
      'unused-imports': eslintPluginUnusedImports,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  eslintCfgPrettier,
]);
