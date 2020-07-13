const process = require('process');

const COMMON_PLUGINS = [
  'babel-plugin-styled-components',
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-nullish-coalescing-operator',
  '@babel/plugin-proposal-optional-chaining',
  'jsx-control-statements',
];

const config = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: '3.6.5',
        useBuiltIns: 'entry',
      },
    ],
    'module:react-native-dotenv',
    '@babel/preset-react',
    '@babel/preset-flow',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '^react-native$': 'react-native-web',
          '~': './app',
        },
      },
    ],
    'react-hot-loader/babel',
    ...COMMON_PLUGINS,
  ],
};

const native_config = {
  presets: [
    'module:metro-react-native-babel-preset',
    'module:react-native-dotenv',
  ],
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

module.exports = (api) => {
  api.cache(false);

  if (process.env.PLATFORM === 'web') {
    return config;
  }

  return native_config;
};
