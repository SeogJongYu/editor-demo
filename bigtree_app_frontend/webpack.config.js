const path = require('path');

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssUrlRelativePlugin = require('css-url-relative-plugin');

module.exports = (env, argv) => ({
  entry: [
    'core-js/stable',
    'regenerator-runtime/runtime',
    'react-hot-loader/patch',
    './index.js',
  ],
  output: {
    filename:
      argv.mode === 'development' ? 'js/[name].js' : 'js/[name].[hash].js',
    chunkFilename:
      argv.mode === 'development' ? 'js/[name].js' : 'js/[name].[hash].js',
    path: path.join(__dirname, '/build'),
    publicPath: '/',
  },
  devtool: argv.mode === 'development' ? 'eval-cheap-module-source-map' : false,
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.web.js', '.js', '.web.tsx', '.tsx', '.web.ts', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.ts?x$/i,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          argv.mode === 'development'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {sourceMap: argv.mode === 'development'},
          },
        ],
      },
      {
        test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/i,
        loader: 'file-loader',
        options: {
          name:
            argv.mode === 'development'
              ? '[path][name].[ext]'
              : '[name]-[hash].[ext]',
          esModule: false,
          outputPath: 'assets/',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...(argv.mode === 'development'
      ? []
      : [
          new MiniCssExtractPlugin({
            filename: 'css/[name]-[hash].css',
            chunkFilename: 'css/[id].css',
          }),
        ]),
    new CopyPlugin(
      [
        {
          from: 'public/*',
          to: '[name].[ext]',
        },
      ],
      {
        ignore: ['public/index.ejs'],
      },
    ),
    new HtmlWebpackPlugin({
      template: './public/index.ejs',
      filename: 'index.html',
    }),
    new CssUrlRelativePlugin(),
    new webpack.DefinePlugin({
      __DEV__: argv.mode === 'development',
    }),
  ],
  optimization: {
    minimize: argv.mode === 'production',
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    host: '0.0.0.0',
    historyApiFallback: true,
    proxy: {
      '/api/': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
});
