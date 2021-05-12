const paths = require('./paths')
const { name } = require(paths.appPackageJson)

// по строке `/widget` в контейнерах матчится проксирование
const publicAssetsSpace = `/widget/${name}/assets`

module.exports = {
  publicAssetsSpace,
}
