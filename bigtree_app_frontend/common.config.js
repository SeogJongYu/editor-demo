const crypto = require('crypto');
const fs = require('fs');

const ENV_FILES = [
  '.env',
  '.env.development',
  '.env.production',
  '.browserslistrc',
  'babel.config.js',
  'babel.config.native.js',
  'babel.config.web.js',
  './app/Config.ts',
  'common.config.js',
];

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
};
