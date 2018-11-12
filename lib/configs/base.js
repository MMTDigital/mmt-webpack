const path = require('path')
const merge = require('webpack-merge')

const javascriptConfig = require('./javascript')
const markdownConfig = require('./markdown')
const videoConfig = require('./video')
const styleConfig = require('./style')
const imageConfig = require('./image')
const fontConfig = require('./font')
const htmlConfig = require('./html')
const pdfConfig = require('./pdf')
const svgConfig = require('./svg')

const ManifestPlugin = require('webpack-manifest-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

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
    fontConfig(options, mmtConfig),
    htmlConfig(options, mmtConfig),
    markdownConfig(options, mmtConfig),
    pdfConfig(options, mmtConfig),
    svgConfig(options, mmtConfig)
  )
}
