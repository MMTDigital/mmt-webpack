const config = (options, mmtConfig) => {
  return {
    module: {
      rules: [
        {
          test: /\.md$/,
          use: [
            { loader: require.resolve('html-loader') },
            { loader: require.resolve('markdown-loader') }
          ]
        }
      ]
    }
  }
}

module.exports = config
