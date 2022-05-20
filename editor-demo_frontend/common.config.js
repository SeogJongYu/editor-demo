const crypto = require('crypto');
const fs = require('fs');
const process = require('process');

const ENV_FILES = [
  '.env',
  '.env.development',
  '.env.production',
  '.browserslistrc',
  'babel.config.js',
  'babel.config.native.js',
  'babel.config.common.js',
  'babel.config.web.js',
  './app/Config.ts',
  'common.config.js',
];

let ENV_FILE = '.env';

if (process.env.NODE_ENV === 'production' && fs.existsSync('.env.production')) {
  ENV_FILE = '.env.production';
} else if (fs.existsSync('.env.development')) {
  ENV_FILE = '.env.development';
}

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
  ENV_FILE,
};
