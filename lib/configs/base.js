const path = require('path')
const merge = require('webpack-merge')

const videoConfig = require('./video')
const styleConfig = require('./style')
const imageConfig = require('./image')
const javascriptConfig = require('./javascript')
const fontConfig = require('./font')

const ManifestPlugin = require('webpack-manifest-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
// import FaviconsWebpackPlugin from 'favicons-webpack-plugin'

const config = (options, mmtConfig) => {
  const { verbose } = mmtConfig

  return {
    output: {
      filename: 'bundle.[chunkhash:6].js'
    },

    resolve: {
      alias: {
        webpack: path.resolve(process.cwd(), 'node_modules/webpack')
      }
    },

    stats: verbose ? 'verbose' : 'none',

    plugins: [
      new CleanWebpackPlugin(options.output.path, { allowExternal: true }),

      new ManifestPlugin({
        publicPath: ''
      }),

      new FriendlyErrorsWebpackPlugin({
        clearConsole: !verbose
      }),

      // new FaviconsWebpackPlugin(path.resolve(root, `${paths.input.images}/favicon.png`)),
    ]
  }
}

module.exports = (options, mmtConfig) => {
  return merge(
    config(options, mmtConfig),
    styleConfig(options, mmtConfig),
    javascriptConfig(options, mmtConfig),
    imageConfig(options, mmtConfig),
    videoConfig(options, mmtConfig),
    fontConfig(options, mmtConfig)
  )
}
