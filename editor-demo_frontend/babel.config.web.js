const isDevelopment = process.env.NODE_ENV === 'development';

const COMMON_CONFIG = require('./babel.config.common');

module.exports = {
  presets: [
    '@babel/preset-typescript',
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {runtime: 'automatic', importSource: '@emotion/react'},
    ],
  ],
  plugins: [
    'babel-plugin-twin',
    'babel-plugin-macros',
    '@emotion',
    [
      'module-resolver',
      {
        alias: {
          '~': './app',
          '^react-native$': './node_modules/react-native-web',
        },
      },
    ],
    ['react-native-web', {commonjs: true}],
    isDevelopment && 'react-refresh/babel',
    ...COMMON_CONFIG.plugins,
  ].filter(Boolean),
};
