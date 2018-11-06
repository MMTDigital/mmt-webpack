const resolve = require('resolve')

module.exports = {
  test: /\.(js|jsx|mjs)$/,
  exclude: /node_modules/,
  rules: [
    // {
    //   enforce: 'pre',
    //   loader: 'standard-loader',
    //   options: {
    //     error: false,
    //     parser: 'babel-eslint',
    //     snazzy: true
    //   }
    // },
    {
      loader:  require.resolve('babel-loader'),
      options: {
        sourceMaps: 'both'
      }
    }
  ]
}
