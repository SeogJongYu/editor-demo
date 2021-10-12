/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');

const {cacheVersion} = require('./common.config');

module.exports = {
  cacheVersion,
  resolver: {
    extraNodeModules: {
      '~': path.resolve('./app'),
    },
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
