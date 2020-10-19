module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  rules: {
    'max-len': [
      'error',
      100,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'no-unused-vars': [
      'warn',
      {varsIgnorePattern: '^_', argsIgnorePattern: '^_'},
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {varsIgnorePattern: '^_', argsIgnorePattern: '^_'},
    ],
    'import/order': ['warn'],
    'import/newline-after-import': ['warn'],
    'react/jsx-no-undef': ['error', {allowGlobals: true}],
    'import/no-unresolved': [
      'error',
      {
        ignore: ['@env'],
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      'babel-module': {},
      typescript: {
        alwaysTryTypes: true,
      },
      node: {
        extensions: [
          '.android.js',
          '.ios.js',
          '.native.js',
          '.web.js',
          '.js',
          '.android.ts',
          '.android.tsx',
          '.ios.ts',
          '.ios.tsx',
          '.native.ts',
          '.native.tsx',
          '.web.ts',
          '.web.tsx',
          '.ts',
          '.tsx',
        ],
      },
    },
    'import/ignore': ['react-native'],
  },
};
