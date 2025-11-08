import js from '@eslint/js';
import eslintCfgPrettier from 'eslint-config-prettier/flat';
import eslintPlgTurbo from 'eslint-plugin-turbo';
import eslintPlgUnusedImports from 'eslint-plugin-unused-imports';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist/']),
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
  eslintPlgTurbo.configs['flat/recommended'],
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
