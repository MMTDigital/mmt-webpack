// import path from 'path'
// import paths from '../../paths'
// import style from '../loader-configs/style'
// import font from '../loader-configs/font'
// import html from '../loader-configs/html'
// import image from '../loader-configs/image'
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
// import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
// import DelWebpackPlugin from 'del-webpack-plugin'
// import ManifestPlugin from 'webpack-manifest-plugin'

const path = require('path')
const merge = require('webpack-merge')
const styleConfig = require('./loaders/style')
const javascript = require('./loaders/javascript')
const WebpackMessages = require('webpack-messages')
const ManifestPlugin = require('webpack-manifest-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const config = (options) => {
  console.log(options.output.path)

  return {
    output: {
      filename: 'bundle.[chunkhash:6].js'
    },

    resolve: {
      alias: {
        webpack: path.resolve(process.cwd(), 'node_modules/webpack')
      }
    },

    module: {
      rules: [
        javascript,
        // font,
        // html,
        // image
      ]
    },

    plugins: [
      new CleanWebpackPlugin(options.output.path, { allowExternal: true }),

      new WebpackMessages({ name: 'MMT Bundle' }),

      new ManifestPlugin({
        publicPath: ''
      }),

      // new FriendlyErrorsWebpackPlugin({
      //   clearConsole: false
      // }),

      // new FaviconsWebpackPlugin(path.resolve(root, `${paths.input.images}/favicon.png`)),
    ]
  }
}

module.exports = (options) => {
  return merge(config(options), styleConfig)
}
