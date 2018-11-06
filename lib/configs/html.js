const config = (options, mmtConfig) => {
  return {
    module: {
      rules: [
        {
          test: /\.html$/,
          use: {
            loader: require.resolve('html-loader')
          }
        }
      ]
    }
  }
}

module.exports = config
