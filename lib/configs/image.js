const resolve = require('resolve')

const config = (options, mmtConfig) => {
  const extraRules = []

  if (mmtConfig.imageDataUri) {
    extraRules.push({
      loader: require.resolve('url-loader'), // === DataURI
      options: {
        limit: 8192, // Will use img-loader over this limit
        publicPath: '/assets/',
        name: 'images/[name].[ext]'
      }
    })
  }

  return {
    module: {
      rules: [{
        ...extraRules,
        test: /\.(png|jpg|jpeg|gif|webp)$/,
        use: [
          {
            loader: require.resolve('file-loader'),
            options: {
              publicPath: '/assets/',
              name: 'images/[name].[ext]'
            }
          },
          {
            loader: require.resolve('img-loader'),
            options: {
              plugins: [
                require('imagemin-gifsicle')({
                  interlaced: false
                }),
                require('imagemin-mozjpeg')({
                  progressive: true,
                  arithmetic: false
                }),
                require('imagemin-pngquant')({
                  floyd: 0.5,
                  speed: 2
                }),
                require('imagemin-svgo')({
                  plugins: [
                    { removeTitle: true },
                    { convertPathData: false }
                  ]
                })
              ]
            }
          }
        ]
      }]
    }
  }
}

module.exports = config
