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
    [
      'module:react-native-dotenv',
      {
        path: '../.env',
      },
    ],
  ],
};
