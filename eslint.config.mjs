// Flat ESLint config (ESM)
// See: https://eslint.org/docs/latest/use/configure/configuration-files-new

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const tsRootDir = dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
  {
    ignores: ['node_modules', 'playwright-report', 'allure-results', 'test-results'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: tsRootDir,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
);
