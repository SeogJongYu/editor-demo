const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssUrlRelativePlugin = require('css-url-relative-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const indexSourceFilePath = path.resolve('./public/index.ejs');

module.exports = (env, argv) => ({
  target: 'web',
  entry: ['core-js/stable', 'regenerator-runtime/runtime', './index.js'],
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
          argv.mode === 'development'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: argv.mode === 'development',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: argv.mode === 'development',
            },
          },
        ],
      },
      {
        test: /\.(ico|png|jpg|jpeg|gif|woff|woff2|ttf|eot)$/i,
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
      {
        test: /\.svg$/i,
        use: [
          '@svgr/webpack',
          {
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
    new CopyPlugin({
      patterns: [
        {
          from: 'public/**/*',
          to: '[path][name].[ext]',
          filter: async resourcePath => {
            // index.ejs 파일은 복사하지 않음
            if (resourcePath === indexSourceFilePath) {
              return false;
            }

            return true;
          },
          transformPath: filePath => {
            // path에서 public/ 부분 제거
            const newPathSep = filePath.split(path.sep).slice(1);
            return path.join(...newPathSep);
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.ejs',
      filename: 'index.html',
    }),
    new CssUrlRelativePlugin(),
    new webpack.DefinePlugin({
      __DEV__: argv.mode === 'development',
    }),
    argv.mode === 'development' && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  optimization: {
    minimize: argv.mode === 'production',
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
    },
  },
  // App 용량이 커질 시 캐시 사용 고려
  // https://webpack.js.org/configuration/other-options/#cache
  // cache: true,
  devServer: {
    host: '0.0.0.0',
    historyApiFallback: true,
    proxy: {
      '/api/': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
    hot: true,
  },
});
