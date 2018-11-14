const config = (options, mmtConfig) => {
  return {
    module: {
      rules: [
        {
          test: /\.pdf?$/,
          loader: require.resolve('file-loader'),
          options: {
            name: 'documents/[name].[hash:6].[ext]'
          }
        }
      ]
    }
  }
}

module.exports = config
