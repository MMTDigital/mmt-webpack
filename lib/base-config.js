// import path from 'path'
// import paths from '../../paths'
const javascript = require('./loaders/javascript')
// import style from '../loader-configs/style'
// import font from '../loader-configs/font'
// import html from '../loader-configs/html'
// import image from '../loader-configs/image'
// import ExtractTextPlugin from 'extract-text-webpack-plugin'
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
// import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
// import DelWebpackPlugin from 'del-webpack-plugin'
// import ManifestPlugin from 'webpack-manifest-plugin'
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebpackMessages = require('webpack-messages')
const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin')

module.exports = (options) => {
  console.log(options.output.path)

  return {
    output: {
      filename: '[name].[chunkhash:6].js'
    },

    resolve: {
      alias: {
        webpack: path.resolve(process.cwd(), 'node_modules/webpack')
      }
    },

    module: {
      rules: [
        javascript,
        // style,
        // font,
        // html,
        // image
      ]
    },

    plugins: [
      new CleanWebpackPlugin(options.output.path, { allowExternal: true }),

      new WebpackMessages({ name: 'MMT Bundle' }),

      // new FriendlyErrorsWebpackPlugin({
      //   clearConsole: false
      // }),

      new ManifestPlugin({
        publicPath: ''
      }),

      // new PeerDepsExternalsPlugin(),

      // new FaviconsWebpackPlugin(path.resolve(root, `${paths.input.images}/favicon.png`)),

      // new ExtractTextPlugin({
      //   filename: 'styles.css',
      //   allChunks: true,
      //   ignoreOrder: true
      // })
    ]
  }
}
