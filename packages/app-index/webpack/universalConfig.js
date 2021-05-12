const { client, server } = require('universal-webpack/config')

const config = require('./config')
const settings = require('./universalWebpackSettings.json')

const side = process.env.WEBPACK_SIDE

const createUniversalConfig = () => {
  switch (side) {
    case 'client':
      return client(config, settings)
    case 'server':
      return server(config, settings)
    default:
      throw new Error(`Unexpected WEBPACK_SIDE: ${side}`)
  }
}

module.exports = createUniversalConfig()
