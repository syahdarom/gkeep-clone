import js from '@eslint/js';
import eslintCfgPrettier from 'eslint-config-prettier/flat';
import eslintPlgUnusedImports from 'eslint-plugin-unused-imports';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['.turbo/', 'apps/', 'packages/']),
  {
    files: ['**/*.{js,mjs,ts,mts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
    rules: {
      'no-console': 'error',
    },
  },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  tseslint.configs.recommended,
  {
    plugins: {
      'unused-imports': eslintPlgUnusedImports,
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
