const isDevelopment = process.env.NODE_ENV === 'development';

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
    'twin',
    'macros',
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
    'babel-plugin-react-native-web',
    isDevelopment && ['react-refresh/babel'],
    [
      'module:react-native-dotenv',
      {
        path: '../.env',
      },
    ],
  ].filter(Boolean),
};
