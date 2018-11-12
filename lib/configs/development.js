const WebpackBar = require('webpackbar')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
  mode: 'development',
  watch: true,
  plugins: [
    new WebpackBar({ clear: false }),
    new FriendlyErrorsWebpackPlugin({ clearConsole: true })
  ]
}
