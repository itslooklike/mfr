'use strict'

require('dotenv').config()

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'development') {
  throw new Error('NODE_ENV нужно обязательно указать. Вы указали: ' + process.env.NODE_ENV)
}

const paths = require('./paths')
const { publicAssetsSpace } = require('./constants')

const { port, appID } = require(paths.appCliSettingsPath)

const MFB = /^MFB_/i

// с `process.env` работать только в этом файле
function getClientEnv() {
  const raw = Object.keys(process.env)
    .filter((key) => MFB.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key]
        return env
      },
      {
        NODE_ENV: process.env.NODE_ENV,

        // путь к собранному приложению
        __APP_CLIENT_PATH__: paths.clientPath,

        // путь к статике (css,js,img и прочее), нужен для миддлевары статики
        __APP_PUBLIC_PATH__: publicAssetsSpace,

        __APP_ID__: appID,
        __APP_SERVER_PORT__: port,
      }
    )

  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = Object.keys(raw).reduce((env, key) => {
    env[key] = JSON.stringify(raw[key])
    return env
  }, {})

  return { raw, stringified }
}

module.exports = {
  getClientEnv,
}
