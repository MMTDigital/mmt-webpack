const config = (options, mmtConfig) => {
  return {
    module: {
      rules: [
        {
          test: /\.svg?$/,
          loader: require.resolve('file-loader'),
          exclude: /fonts/,
          options: {
            name: 'icons/[name].[hash:6].svg'
          }
        }
      ]
    }
  }
}

module.exports = config
