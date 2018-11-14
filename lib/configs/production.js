const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

module.exports = {
  stats: 'verbose',
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    nodeEnv: 'production',
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  }
}
