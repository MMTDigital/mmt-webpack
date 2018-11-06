const config = (options, mmtConfig) => {
  return {
    module: {
      rules: [{
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        exclude: /icons/,
        use: {
          loader: require.resolve('file-loader'),
          options: {
            publicPath: './',
            name: 'fonts/[name].[hash:6].[ext]'
          }
        }
      }]
    }
  }
}

module.exports = config
