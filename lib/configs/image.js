const resolve = require('resolve')

const config = (options, mmtConfig) => {
  let baseLoader
  const name = 'images/[name].[hash:6].[ext]'
  const limit = 8192 // Data URI file size limit. Will use pure img-loader over this limit

  if (mmtConfig.imageDataUri) {
    baseLoader = {
      loader: require.resolve('url-loader'), // Data URI
      options: { name, limit }
    }
  } else {
    baseLoader = {
      loader: require.resolve('file-loader'),
      options: { name }
    }
  }

  return {
    module: {
      rules: [{
        test: /\.(png|jpg|jpeg|gif|webp)$/,
        use: [
          baseLoader,
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
