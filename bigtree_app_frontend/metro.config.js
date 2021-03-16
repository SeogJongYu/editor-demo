/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const crypto = require('crypto');
const fs = require('fs');

const ENV_FILES = ['.env', '.env.development', '.env.production'];

function getHash(fileName) {
  if (fs.existsSync(fileName)) {
    let hash = crypto.createHash('sha256');
    hash.update(fs.readFileSync(fileName));
    return hash.digest('hex');
  }

  return '';
}

const cacheVersion = ENV_FILES.map(getHash).join();

module.exports = {
  cacheVersion,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
