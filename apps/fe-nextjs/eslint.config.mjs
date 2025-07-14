import { FlatCompat } from '@eslint/eslintrc';
import eslintCfgPrettier from 'eslint-config-prettier';
import eslintPlgTurbo from 'eslint-plugin-turbo';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  eslintPlgTurbo.configs['flat/recommended'],
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  eslintCfgPrettier,
];

export default eslintConfig;
