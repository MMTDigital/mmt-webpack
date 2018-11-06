const resolve = require('resolve')

const config = (options, mmtConfig) => {
  return {
    module: {
      rules: [{
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        use: {
          loader: require.resolve('file-loader'),
          options: {
            name: 'fonts/[name].[hash:6].[ext]'
          }
        }
      }]
    }
  }
}

module.exports = config
