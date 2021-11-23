const COMMON_CONFIG = require('./babel.config.common');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
      },
    ],
    [
      'module-resolver',
      {
        alias: {
          '~': './app',
        },
      },
    ],
    ...COMMON_CONFIG.plugins,
  ],
};
