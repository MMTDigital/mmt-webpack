#!/usr/bin/env node

const errorStyles = require('./error-styles')
const baseConfig = require('./base-config')
const devConfig = require('./dev-config')
const merge = require('webpack-merge')
const webpack = require('webpack')
const kleur = require('kleur')
const util = require('util')
const path = require('path')
const fs = require('fs')

const pe = require('pretty-error').start()
pe.appendStyle(errorStyles)

const rootPath = process.cwd()
const readFile = util.promisify(fs.readFile)
const mmtWebpackConfigExtensions = require(`${rootPath}/config/extends.js`)

const mergeConfigs = (mmtManifest, mmtWebpackConfigExtensions) => {
  const configurableConfig = configurableWebpackValues(mmtManifest)

  console.log('IMPORTED DEV', mmtWebpackConfigExtensions.webpackDev)

  const mergedDevConfig = merge(
    baseConfig(configurableConfig),
    devConfig,
    configurableConfig,
    mmtWebpackConfigExtensions.webpackDev
  )

  console.log('mergedDevConfig', mergedDevConfig)
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

const getMmtManifestFile = async () => {
  const manifest = await readFile(`${rootPath}/.mmt`, 'utf8')
  return JSON.parse(manifest)
}

const webpackCallBack = (error, stats) => {
  if (error) console.error(error)
  // if (!error) console.info(stats)
}

const logError = (str, error) => {
  console.log(`${kleur.bold.white.bgRed(' ' + str + ' ')} \n`)
  if (error) console.log(error)
}

const start = async () => {
  let mmtManifest
  let webpackConfig

  try {
    mmtManifest = await getMmtManifestFile()
  } catch (error) {
    logError('There was a problem either finding or parsing your .mmt config file. It must be valid JSON', error)
    return
  }

  try {
    webpackConfig = mergeConfigs(mmtManifest, mmtWebpackConfigExtensions)
  } catch (error) {
    logError('There was an error merging configs', error)
    return
  }

  try {
    webpack(webpackConfig, webpackCallBack)
  } catch (error) {
    logError('An error occurred in your mmt-webpack build', error)
    return
  }
}

start()
