const fs = require('fs')
const path = require('path')

const serverFileName = 'server.js'
const clientChunksFilename = 'chunks.json'

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd())

const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

const appBuildPath = resolveApp('build')
const appPackageJson = resolveApp('package.json')
const appNodeModules = resolveApp('node_modules')
const appCliSettingsPath = resolveApp('mfb-cli.json')

const clientPath = path.resolve(appBuildPath, 'client')
const serverPath = path.resolve(appBuildPath, 'server')

const ownNodeModules = path.resolve(__dirname, '..', 'node_modules')
const clientChunksPath = path.join(clientPath, clientChunksFilename)
const buildedServerFilePath = path.join(serverPath, serverFileName)

module.exports = {
  appDirectory,
  appPackageJson,
  appCliSettingsPath,
  clientPath,
  serverPath,
  serverFileName,
  buildedServerFilePath,
  clientChunksPath,
  appBuildPath,
  appNodeModules,
  ownNodeModules,
}
