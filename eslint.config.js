import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettier from 'prettier'
import vitest from 'eslint-plugin-vitest'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}', '**/*.test.{js,ts}', '**/*.spec.{js,ts}'],
    ignores: ['node_modules/', 'dist/', 'build/'],
    plugins: {
      prettier: prettier,
      vitest: vitest,
    },
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    rules: {
      quotes: ['error', 'single'], // Usar aspas simples
      semi: ['error', 'never'],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      // '@typescript-eslint/no-empty-interface': 'off',
      // '@typescript-eslint/ban-types': 'off',
    },
  },
]
