const extensions = [
  '.android.ts',
  '.android.tsx',
  '.ios.ts',
  '.ios.tsx',
  '.native.ts',
  '.native.tsx',
  '.web.ts',
  '.web.tsx',
  '.d.ts',
  '.ts',
  '.tsx',
  '.android.js',
  '.ios.js',
  '.native.js',
  '.web.js',
  '.js',
];

const COMMON_EXTENDS = [
  'eslint:recommended',
  'plugin:import/recommended',
  'plugin:react/recommended',
  'plugin:react/jsx-runtime',
  'plugin:react-hooks/recommended',
  'plugin:prettier/recommended',
];

const COMMON_RULES = {
  'max-len': [
    'error',
    100,
    2,
    {
      ignoreUrls: true,
      ignoreComments: true,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    },
  ],
  'import/order': [
    'warn',
    {
      'newlines-between': 'always',
      pathGroups: [
        {
          pattern: '~/**',
          group: 'parent',
          position: 'before',
        },
      ],
    },
  ],
  'import/no-unresolved': [
    'error',
    {
      ignore: ['@env'],
    },
  ],
  'react-native/no-inline-styles': 'off',
  'react/jsx-uses-react': 'off',
  'react/react-in-jsx-scope': 'off',
};

module.exports = {
  root: true,
  env: {
    browser: true,
  },
  overrides: [
    {
      files: '**/*.+(ts|tsx)',
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'react-native'],
      extends: [
        ...COMMON_EXTENDS,
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {varsIgnorePattern: '^_', argsIgnorePattern: '^_'},
        ],
        ...COMMON_RULES,
      },
    },
    {
      files: '**/*.+(js|jsx)',
      env: {
        commonjs: true,
        es6: true,
        node: true,
      },
      parser: 'babel-eslint',
      parserOptions: {
        ecmaVersion: 2018,
      },
      extends: [...COMMON_EXTENDS],
      rules: {
        ...COMMON_RULES,
        'no-unused-vars': [
          'warn',
          {varsIgnorePattern: '^_', argsIgnorePattern: '^_'},
        ],
      },
    },
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      'babel-module': {
        extensions,
      },
      typescript: {
        alwaysTryTypes: true,
      },
      node: {
        extensions,
      },
    },
    'import/ignore': ['react-native'],
  },
};
