require('dotenv').config()

const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const { name } = require('../package.json')
const { rootPath, clientPath } = require('./constants')

const { WEBPACK_SIDE } = process.env

const isClient = WEBPACK_SIDE === 'client'
const isServer = WEBPACK_SIDE === 'server'
const publicPathNS = `/${name}-assets`

module.exports = {
  mode: 'production',
  optimization: {
    minimize: isClient, // иначе не работает DI в nestjs
  },
  entry: `${clientPath}/index.tsx`,
  output: {
    path: path.resolve(rootPath, 'build/client'),
    filename: '[name]-[fullhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: `${publicPathNS}/`,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  context: rootPath,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: isClient
          ? [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              { loader: 'css-loader' },
            ]
          : [
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    exportOnlyLocals: true,
                  },
                },
              },
            ],
      },
      {
        test: /\.(png|svg|jpg|gif|webp)$/,
        use: [
          {
            loader: 'file-loader',
            options: isClient ? {} : { emitFile: false },
          },
        ],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    isClient
      ? new MiniCssExtractPlugin({
          filename: '[name].[fullhash].css',
          chunkFilename: '[id].[fullhash].css',
        })
      : undefined,

    isClient
      ? new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
              },
            ],
          },
        })
      : undefined,

    new webpack.DefinePlugin({
      __APP_NAME__: JSON.stringify(name),
      __ROOT_DIR__: JSON.stringify(rootPath),
      __PUBLIC_PATH_NS__: JSON.stringify(publicPathNS),
      __IS_CLIENT__: isClient,
      __IS_SERVER__: isServer,
    }),
  ].filter(Boolean),
}
