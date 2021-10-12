module.exports = api => {
  api.cache(false);

  if (process.env.PLATFORM === 'web') {
    return require('./babel.config.web');
  }

  return require('./babel.config.native');
};
