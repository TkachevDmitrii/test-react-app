module.exports = {
  plugins: ['@typescript-eslint', 'import', 'react', 'react-hooks'],

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/typescript',
  ],

  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    sourceType: 'module',
    ecmaFeatures: {
      ecmaVersion: '2021',
      sourceType: 'module',
      jsx: true,
    },
  },

  env: {
    browser: true,
  },

  rules: {
    // from base
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
      },
    ],
    'no-prototype-builtins': 'off',
    // 'no-unused-vars': [
    //   'error',
    //   {
    //     varsIgnorePattern: '_',
    //     argsIgnorePattern: '_',
    //     caughtErrorsIgnorePattern: '_',
    //   },
    // ],
    'import/named': 'off',
    'import/namespace': 'off',
    'import/first': 'error',
    // 'import/no-default-export': 'warn',
    'import/newline-after-import': 'error',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    // 'react-hooks/exhaustive-deps': 'error',
    'no-nested-ternary': 'error',
    'no-template-curly-in-string': 'error',
    'guard-for-in': 'error',
    'no-alert': 'error',
    'no-caller': 'error',
    'no-eval': 'error',
    // 'no-console': 'error',
    yoda: ['error', 'never'],
    // 'prefer-template': 'error',
    eqeqeq: ['error', 'smart'],
    'default-case': 'error',
    'unicode-bom': 'error',
    'prefer-const': 'error',
    // 'padding-line-between-statements': [
    //   'error',
    //   {
    //     blankLine: 'always',
    //     prev: '*',
    //     next: 'return',
    //   },
    // ],
    'react/display-name': 'off',
    'react/no-deprecated': 'error',
    'react/no-access-state-in-setstate': 'error',
    'react/no-this-in-sfc': 'error',
    // 'react/jsx-sort-props': [
    //   'error',
    //   {
    //     ignoreCase: true,
    //     callbacksLast: true,
    //     reservedFirst: true,
    //   },
    // ],
    'react/sort-comp': 'error',

    // overrides from base for '**/*.{ts,tsx}'
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/await-thenable': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    // '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/prefer-regexp-exec': 'off',
    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/no-unused-vars': [
    //   'error',
    //   {
    //     varsIgnorePattern: '_',
    //     argsIgnorePattern: '_',
    //     caughtErrorsIgnorePattern: '_',
    //   },
    // ],
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',
    // '@typescript-eslint/consistent-type-assertions': [
    //   'error',
    //   {
    //     assertionStyle: 'as',
    //     objectLiteralTypeAssertions: 'allow-as-parameter',
    //   },
    // ],
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',

    // from current file
    'no-extra-boolean-cast': 'off',
    'no-console': 'off',
    'no-plusplus': 'off',

    // overrides from current file for '**/*.{ts,tsx}'
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-empty-interface': 1,
    // '@typescript-eslint/no-use-before-define': ['error', { variables: false }],

    //
    // new rules
    //
    'max-len': ['error', { code: 150 }],
    // 'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 1, maxEOF: 1 }],
    // 'react/jsx-one-expression-per-line': ['error', { allow: 'single-child' }],

    'react/jsx-closing-tag-location': 'error',
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'react/jsx-indent': [
      'error',
      2,
      { checkAttributes: false, indentLogicalExpressions: true },
    ],
    'react/jsx-max-props-per-line': ['error', { when: 'multiline' }],
    'react/jsx-indent-props': ['error', 2],
    'react/sort-prop-types': 'error',
    'react/jsx-props-no-multi-spaces': 'error',

    'import/no-default-export': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'quotes': ['error', 'single', { avoidEscape: true }],
    'jsx-quotes': ['error', 'prefer-single'],
    'react/react-in-jsx-scope': 'off',
    semi: ['error', 'never'],
    'padding-line-between-statements': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    'no-empty': ['error', { 'allowEmptyCatch': true }],
    '@typescript-eslint/no-unused-vars': 'off',
    'import/no-named-as-default-member': 'off',
    'react/jsx-sort-props': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2, {
      ignoredNodes: ['TSTypeParameterInstantiation'],
      'SwitchCase': 1,
    }],
    'prefer-template': 'off',
    'import/no-extraneous-dependencies': 'off',
    'eol-last': 'error',
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 1, maxEOF: 0 }],
  },

  settings: {
    react: {
      version: '17',
    },
    
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './',
      }
    }

  },

  overrides: [
    {
      files: ['!src/**'],
      env: {
        browser: false,
        node: true,
      },
    },
  ],
}
