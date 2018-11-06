#!/usr/bin/env node

const devConfig = require('./configs/development')
const errorStyles = require('./error-styles')
const baseConfig = require('./configs/base')
const isEmpty = require('lodash.isempty')
const merge = require('webpack-merge')
const webpack = require('webpack')
const kleur = require('kleur')
const path = require('path')

const pe = require('pretty-error').start()
pe.appendStyle(errorStyles)

const rootPath = process.cwd()
const mmtWebpackConfigExtensions = require(`${rootPath}/config/extends.js`)
const mmtConfig = require(`${rootPath}/config/mmt.config.js`) || {}

const mergeConfigs = (mmtConfig, mmtWebpackConfigExtensions) => {
  const configurableConfig = configurableWebpackValues(mmtConfig)

  // console.log('IMPORTED DEV', mmtWebpackConfigExtensions.webpackDev)

  const mergedDevConfig = merge(
    baseConfig(configurableConfig, mmtConfig),
    devConfig,
    configurableConfig,
    mmtWebpackConfigExtensions.webpackDev
  )

  // console.log('mergedDevConfig', mergedDevConfig)
  return mergedDevConfig
}

const configurableWebpackValues = (values) => {
  // Let's set some sensible defaults
  const {
    entryPath = 'src',
    outputPath = 'build',
    assetPath = 'assets'
  } = values

  const entryPathRelativeToProject = path.resolve(rootPath, entryPath)
  const outputPathRelativeToProject = path.resolve(rootPath, outputPath)

  return {
    entry: entryPathRelativeToProject,
    output: {
      path: outputPathRelativeToProject,
      publicPath: assetPath
    }
  }
}

const webpackCallBack = (error, stats, mmtConfig) => {
  if (mmtConfig.verbose) console.log(stats)
  if (error) logError('An error occurred in your mmt-webpack build', error)
}

const logError = (str, error) => {
  console.log(`${kleur.bold.white.bgRed(' ' + str + ' ')} \n`)
  if (error) console.log(error)
}

const logInfo = (str) => {
  console.info(`${kleur.bold.white.bgBlue(' ' + str + ' ')} \n`)
}

const start = async () => {
  let webpackConfig

  if (isEmpty(mmtConfig)) {
    logInfo('No MMT config file found or no extra config added. Proceeding with mmt-webpack defaults')
  }

  try {
    webpackConfig = mergeConfigs(mmtConfig, mmtWebpackConfigExtensions)
  } catch (error) {
    logError('There was an error merging configs', error)
    return
  }

  try {
    webpack(
      webpackConfig,
      (error, stats) => webpackCallBack(error, stats, mmtConfig)
    )
  } catch (error) {
    logError('An error occurred in your mmt-webpack build', error)
    return
  }
}

start()
