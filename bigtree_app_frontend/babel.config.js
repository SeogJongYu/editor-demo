const process = require('process');

const COMMON_PLUGINS = [
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-nullish-coalescing-operator',
  '@babel/plugin-proposal-optional-chaining',
  'module:react-native-dotenv',
];

const COMMON_PRESETS = ['@babel/preset-typescript'];

const config = {
  presets: [
    '@emotion/babel-preset-css-prop',
    [
      '@babel/preset-env',
      {
        corejs: '3.18.0',
        useBuiltIns: 'entry',
      },
    ],
    [
      '@babel/preset-react',
      {runtime: 'automatic', importSource: '@emotion/react'},
    ],
    '@babel/preset-flow',
    ...COMMON_PRESETS,
  ],
  plugins: [
    '@emotion',
    'twin',
    'macros',
    ['react-native-web', {commonjs: true}],
    [
      'module-resolver',
      {
        alias: {
          '^react-native$': 'react-native-web',
          '~': './app',
        },
      },
    ],
    ...COMMON_PLUGINS,
    process.env.BABEL_ENV !== 'production' && 'react-refresh/babel',
  ].filter(Boolean),
};

const native_config = {
  presets: ['module:metro-react-native-babel-preset', ...COMMON_PRESETS],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '~': './app',
        },
      },
    ],
    ...COMMON_PLUGINS,
    [
      '@babel/plugin-transform-react-jsx',
      {runtime: 'automatic', importSource: '@emotion/react'},
    ],
  ],
};

module.exports = api => {
  api.cache(false);

  if (process.env.PLATFORM === 'web') {
    return config;
  }

  return native_config;
};
