const path = require('path')
const webpack = require('webpack')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const paths = require('./paths')
const checkSettings = require('./checkSettings')
const generateChunks = require('./generateChunks')
const { publicAssetsSpace } = require('./constants')
const { getClientEnv } = require('./env')
const { name, dependencies } = require(paths.appPackageJson)

const config = (settings) => {
  checkSettings(settings)

  const dotenv = getClientEnv()

  const { side } = settings
  // const IS_PROD = dotenv.raw.NODE_ENV === 'production'
  const IS_DEV = dotenv.raw.NODE_ENV === 'development'

  const isClient = side === 'client'
  const isServer = side === 'server'

  // Все ассеты должны иметь абсолютный url, тк хостятся на резных сервисах
  const clientPublicPath = `${publicAssetsSpace}/`

  const webpackConfig = {
    mode: IS_DEV ? 'development' : 'production',
    optimization: {
      minimize: isClient,
    },
    devtool: IS_DEV ? 'cheap-module-source-map' : 'source-map',
    target: isClient ? 'web' : 'node',
    context: paths.appDirectory,
    entry: isClient
      ? {
          client: ['./src/client/index.js'],
        }
      : {
          server: ['./src/server/main.ts'],
        },
    output: isClient
      ? {
          path: paths.clientPath,
          publicPath: clientPublicPath,
          filename: '[name]-[fullhash].js',
          chunkFilename: '[name]-[fullhash].[id].js',
        }
      : {
          path: paths.serverPath,
          publicPath: clientPublicPath,
          filename: paths.serverFileName,
          libraryTarget: 'commonjs2',
        },
    resolve: {
      alias: {
        svelte: path.resolve(paths.appDirectory, 'node_modules', 'svelte'),
      },
      modules: ['node_modules', paths.appNodeModules],
      extensions: ['.mjs', '.js', '.ts', '.svelte', '.scss'],
      mainFields: ['svelte', 'browser', 'module', 'main'],
    },
    resolveLoader: {
      modules: [paths.appNodeModules, paths.ownNodeModules],
    },
    // Нужно для SSR кита, взято из Sapper
    externals: isServer ? Object.keys(dependencies).concat('encoding') : [],
    module: {
      rules: [
        {
          test: /.tsx?$/,
          use: 'ts-loader',
        },
        {
          test: /\.svelte$/,
          use: [
            {
              loader: 'svelte-loader',
              options: isServer
                ? { compilerOptions: { generate: 'ssr', css: false } }
                : { emitCss: true, hotReload: true, compilerOptions: { hydratable: true } },
            },
          ],
        },
        {
          test: /\.css$/,
          use: isServer
            ? [
                {
                  loader: 'css-loader',
                  options: {
                    modules: {
                      exportOnlyLocals: true,
                    },
                  },
                },
              ]
            : [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader' }],
        },
        {
          test: /\.scss$/,
          use: [
            isClient && MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: '[local]--[hash:base64:5]',
                  localIdentHashPrefix: name,
                  exportOnlyLocals: isServer,
                },
              },
            },
            {
              loader: 'sass-loader',
            },
          ].filter(Boolean),
        },
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader',
          options: {
            removeSVGTagAttrs: false,
          },
        },
        {
          test: /\.(jpe?g|woff|woff2|ttf|eot|png|mp4|ogv|webm|gif|pdf|webp)$/,
          loader: 'file-loader',
          options: {
            emitFile: isClient,
          },
        },
      ].filter(Boolean),
    },
    plugins: [
      isClient &&
        new MiniCssExtractPlugin({
          filename: '[name].[fullhash].css',
          chunkFilename: '[id].[fullhash].css',
        }),

      isClient &&
        new WebpackManifestPlugin({
          fileName: paths.clientChunksPath,
          writeToFileEmit: true,
          filter: (item) => item.isChunk,
          generate: generateChunks(clientPublicPath),
        }),

      new webpack.DefinePlugin(dotenv.stringified),
    ].filter(Boolean),
  }

  return webpackConfig
}

module.exports = config
