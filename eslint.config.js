import path from 'path';

import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import perfectionist from 'eslint-plugin-perfectionist';
import prettier from 'eslint-plugin-prettier';
import tailwindcss from 'eslint-plugin-tailwindcss';
import unusedImports from 'eslint-plugin-unused-imports';
import next from '@next/eslint-plugin-next';

import prettierConfig from './prettier.config.js';

export default [
  {
    ignores: [
      'dist/*',
      '.cache',
      'public',
      'node_modules',
      '*.esm.js',
      '.next',
    ],
  },

  {
    files: [
      './*.js',
      './*.ts',
      './*.tsx',
      'src/**/*.js',
      'src/**/*.ts',
      'src/**/*.tsx',
    ],
    languageOptions: {
      globals: {
        clearTimeout: 'readonly',
        console: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        NodeJS: 'readonly',
        setTimeout: 'readonly',
        window: 'readonly',
      },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        project: ['./tsconfig.json'],
        sourceType: 'module',
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      '@typescript-eslint': ts,
      next,
      perfectionist,
      prettier,
      tailwindcss,
      'unused-imports': unusedImports,
    },
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      // TypeScript ESLint Rules (from `recommended` manually added)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      'no-undef': 'off', // Disable no-undef since TypeScript handles it
      // Perfectionist Sorting Rules
      'perfectionist/sort-array-includes': [
        'warn',
        { ignoreCase: false, type: 'natural' },
      ],

      'perfectionist/sort-classes': [
        'warn',
        { ignoreCase: false, type: 'natural' },
      ],
      'perfectionist/sort-enums': [
        'warn',
        { ignoreCase: false, sortByValue: true, type: 'natural' },
      ],
      'perfectionist/sort-exports': [
        'warn',
        { ignoreCase: false, type: 'natural' },
      ],
      'perfectionist/sort-imports': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          ignoreCase: false,
          type: 'natural',
        },
      ],
      'perfectionist/sort-interfaces': [
        'warn',
        { ignoreCase: false, type: 'natural' },
      ],

      'perfectionist/sort-jsx-props': [
        'warn',
        { ignoreCase: false, type: 'natural' },
      ],
      'perfectionist/sort-maps': [
        'warn',
        { ignoreCase: false, type: 'natural' },
      ],
      'perfectionist/sort-named-exports': [
        'warn',
        { ignoreCase: false, type: 'natural' },
      ],
      'perfectionist/sort-named-imports': [
        'warn',
        { ignoreCase: false, type: 'natural' },
      ],
      'perfectionist/sort-objects': [
        'warn',
        { ignoreCase: false, type: 'natural' },
      ],
      'perfectionist/sort-sets': [
        'warn',
        { ignoreCase: false, type: 'natural' },
      ],
      'perfectionist/sort-switch-case': [
        'warn',
        { ignoreCase: false, type: 'natural' },
      ],
      'perfectionist/sort-variable-declarations': [
        'warn',
        { ignoreCase: false, type: 'natural' },
      ],
      'prettier/prettier': ['warn', prettierConfig],
      'react/display-name': 'off',
      'react/jsx-key': 'off',
      // Disable conflicting sorting rules
      'react/jsx-sort-props': 'off',
      'react/no-unescaped-entities': 'off',
      'sort-imports': 'off',

      'sort-keys': 'off',
      'tailwindcss/classnames-order': 'off',
      'tailwindcss/no-custom-classname': 'off',
    },
  },
];
