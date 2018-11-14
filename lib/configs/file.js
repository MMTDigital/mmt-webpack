const config = (options, mmtConfig) => {
  return {
    module: {
      rules: [
        {
          test: /\.(csv|epub)?$/,
          loader: require.resolve('file-loader'),
          options: {
            name: 'files/[name].[hash:6].[ext]'
          }
        }
      ]
    }
  }
}

module.exports = config
