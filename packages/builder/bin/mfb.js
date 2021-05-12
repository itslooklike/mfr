#!/usr/bin/env node
'use strict'
const ora = require('ora')
const fs = require('fs-extra')
const webpack = require('webpack')

const paths = require('../webpack/paths')
const config = require('../webpack/webpack.config')

const start = async () => {
  fs.emptyDirSync(paths.appBuildPath)

  const createCompiler = (side) =>
    new Promise((resolve, reject) => {
      const spinner = ora(`Compiling ${side}...`).start()

      try {
        const compilerClient = webpack(config({ side }))

        compilerClient.run((err, stats) => {
          if (err) {
            spinner.fail(`Compile ${side} ERROR`)
            reject(err)
            return
          }

          const info = stats.toJson()

          if (stats.hasErrors()) {
            spinner.fail(`Compile ${side} ERROR`)
            reject(info.errors)
            return
          }

          if (stats.hasWarnings()) {
            console.log(info.warnings)
          }

          spinner.succeed(`Compile ${side} SUCCESS`)
          resolve()
        })
      } catch (error) {
        spinner.fail(`Compile ${side} ERROR`)
        reject(error)
      }
    })

  try {
    await createCompiler('client')
    await createCompiler('server')
  } catch (error) {
    console.log(error)
  } finally {
    console.log('Build end')
  }
}

start()
