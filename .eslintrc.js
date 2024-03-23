module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json', // tells parser relative path of tsconfig.json
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },

  // all plugins (eslint-plugin-xxx) go here:
  plugins: [
    '@typescript-eslint',
    '@next/eslint-plugin-next' // https://github.com/vercel/next.js/blob/canary/packages/eslint-plugin-next/lib/index.js
  ],

  // all configs (eslint-config-xxx) go here:
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking', // contains rules that specifically require type information
    'plugin:@next/next/recommended',
    'next', // https://github.com/vercel/next.js/blob/canary/packages/eslint-config-next/package.json
    'next/core-web-vitals'
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    'comma-spacing': ['error', { before: false, after: true }],
    indent: ['error', 2],
    'no-trailing-spaces': 'error',
    semi: 2,
    'key-spacing': ['error', { beforeColon: false, afterColon: true, mode: 'strict' }],
    quotes: [2, 'single'],
    'quote-props': ['error', 'as-needed'],
  }
};
