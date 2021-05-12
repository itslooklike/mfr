const path = require('path')

const rootPath = path.resolve(__dirname, '..')

module.exports = {
  rootPath,
  clientPath: path.resolve(rootPath, 'src', 'client'),
}
