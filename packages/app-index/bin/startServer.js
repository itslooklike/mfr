require('dotenv').config()

require('regenerator-runtime/runtime')
const startServer = require('universal-webpack/server')

const config = require('../webpack/config')
const settings = require('../webpack/universalWebpackSettings.json')

module.exports = startServer(config, settings)
