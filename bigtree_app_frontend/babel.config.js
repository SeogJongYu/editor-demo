const process = require('process');

const COMMON_PLUGINS = [
  '@emotion',
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-nullish-coalescing-operator',
  '@babel/plugin-proposal-optional-chaining',
  'module:react-native-dotenv',
  [
    '@babel/plugin-transform-react-jsx',
    {
      runtime: 'automatic',
    },
  ],
];

const config = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: '3.18.0',
        useBuiltIns: 'entry',
      },
    ],
    '@babel/preset-react',
    '@babel/preset-flow',
  ],
  plugins: [
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
  ],
};

const native_config = {
  presets: ['module:metro-react-native-babel-preset'],
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
  ],
};

module.exports = api => {
  api.cache(false);

  if (process.env.PLATFORM === 'web') {
    return config;
  }

  return native_config;
};
