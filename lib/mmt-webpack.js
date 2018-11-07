#!/usr/bin/env node

const devConfig = require('./configs/development')
const errorStyles = require('./error-styles')
const baseConfig = require('./configs/base')
const isEmpty = require('lodash.isempty')
const merge = require('webpack-merge')
const argv = require('yargs').argv
const webpack = require('webpack')
const kleur = require('kleur')
const path = require('path')

const pe = require('pretty-error').start()
pe.appendStyle(errorStyles)

const logError = (str, error) => {
  console.log(`${kleur.bold.white.bgRed(' ' + str + ' ')} \n`)
  if (error) console.log(error)
}

const logInfo = (str) => {
  console.info(`${kleur.bold.white.bgBlue(' ' + str + ' ')} \n`)
}

const mergeConfigs = (rootPath, mmtConfig, mmtWebpackConfigExtensions, env) => {
  // Simple config info passed in, like entry and output...
  const configurableConfigValues = configurableWebpackValues(rootPath, mmtConfig)

  // Full extensions to the webpack config
  const { webpackDev, webpackProd } = mmtWebpackConfigExtensions
  const mmtExtensions = env === 'production' ? webpackProd : webpackDev

  // Dev or prod-specific config from this package
  const config = env === 'production' ? prodConfig : devConfig

  return = merge(
    baseConfig(configurableConfig, mmtConfig),
    config,
    configurableConfigValues,
    mmtExtensions
  )
}

const configurableWebpackValues = (rootPath, { entry, output = 'build' }) => {
  const entryPathRelativeToProject = path.resolve(rootPath, entry)
  const outputPathRelativeToProject = path.resolve(rootPath, output, 'assets')

  return {
    entry: entryPathRelativeToProject,
    output: {
      path: outputPathRelativeToProject,
      publicPath: './assets'
    }
  }
}

const webpackCallback = (error, stats, mmtConfig) => {
  if (mmtConfig.verbose) console.log(stats)
  if (error) logError('An error occurred in your mmt-webpack build', error)
}

const start = async () => {
  const env = argv.prod ? : 'production' : development

  let mmtConfig
  let webpackConfig
  const rootPath = process.cwd()

  try {
    mmtConfig = require(`${rootPath}/config/mmt.config.js`)
  } catch (error) {
    logError('There was a problem with your config file — config/mmt.config.js', error)
    return
  }

  if (!mmtConfig.entry) {
    logError('You must provide at least an `entry` property in your `mmt.config.js` file')
    return
  }

  const mmtWebpackConfigExtensions = require(`${rootPath}/config/extends.js`)

  try {
    webpackConfig = mergeConfigs(rootPath, mmtConfig, mmtWebpackConfigExtensions, env)
  } catch (error) {
    logError('There was an error merging configs', error)
    return
  }

  try {
    webpack(
      webpackConfig,
      (error, stats) => webpackCallback(error, stats, mmtConfig)
    )
  } catch (error) {
    logError('An error occurred in your mmt-webpack build', error)
    return
  }
}

start()
