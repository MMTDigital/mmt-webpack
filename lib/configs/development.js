const WebpackBar = require('webpackbar')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  plugins: [
    new WebpackBar({ clear: false }),
    new FriendlyErrorsWebpackPlugin({ clearConsole: true }),
    new StyleLintPlugin({
      configFile: require.resolve('@mmtdigital/stylelint-config'),
      fix: true
    })
  ]
}
