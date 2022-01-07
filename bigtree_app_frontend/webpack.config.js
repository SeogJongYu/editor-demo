const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const {cacheVersion} = require('./common.config');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  cache: {
    type: 'filesystem',
    version: cacheVersion,
    buildDependencies: {
      config: [__filename],
    },
  },
  entry: ['core-js/stable', 'regenerator-runtime/runtime', './index.web.js'],
  output: {
    filename: 'js/[name].[contenthash].js',
    assetModuleFilename: 'asset/[name].[contenthash][ext]',
    path: path.join(__dirname, '/build'),
    publicPath: '/',
  },
  devtool: isDevelopment ? 'eval-cheap-module-source-map' : false,
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
    extensions: ['.web.ts', '.ts', '.web.tsx', '.tsx', '.web.js', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.s?css$/i,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: './postcss.config.js',
                sourceMap: true,
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(ico|png|jpg|jpeg|gif|woff|woff2|ttf|eot)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/i,
        use: [
          '@svgr/webpack',
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash][ext]',
              esModule: false,
              outputPath: 'assets/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    !isDevelopment &&
      new MiniCssExtractPlugin({
        filename: 'css/[name]-[contenthash].css',
        chunkFilename: 'css/[id].css',
      }),
    new CopyPlugin({
      patterns: [
        {
          from: '**/*',
          to: '[path][name].[ext]',
          context: 'public/',
          globOptions: {
            ignore: [path.resolve('./public/index.ejs')],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.ejs',
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      __DEV__: isDevelopment,
    }),
    new ForkTsCheckerWebpackPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  optimization: {
    minimize: !isDevelopment,
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    historyApiFallback: true,
    allowedHosts: 'all',
    proxy: [
      {
        context: ['/api', '/ws', '/media', '/static', '/admin', '/views'],
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    ],
    hot: true,
  },
};
