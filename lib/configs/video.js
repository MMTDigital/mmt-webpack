const config = (options, mmtConfig) => {
  return {
    module: {
      rules: [
        {
          test: /\.(webm|mp4|avi|flv|wmv|mov)$/,
          use: {
            loader: require.resolve('file-loader'),
            options: {
              name: 'video/[name].[hash:6].[ext]'
            }
          }
        }
      ]
    }
  }
}

module.exports = config
