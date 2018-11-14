const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const defaultPostCssEnvOptions = {
  stage: 0,
  browsers: [
    'last 2 versions',
    'IE >= 9',
    'safari >= 8'
  ]
}

const defaultScssResourcesLocation = [ './src/styles/resources/all.scss' ]

const config = (options, mmtConfig) => {
  const postCssEnvOptions = mmtConfig.postCssEnvOptions || defaultPostCssEnvOptions
  const scssResourcesLocation = mmtConfig.scssResourcesLocation || defaultScssResourcesLocation

  return {
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },

    module: {
      rules: [{
        test: /\.(css|scss)(\?.+)?$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              sourceMap: true
            }
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: true, // Switch this on for CSS Modules (https://github.com/css-modules/css-modules)
              localIdentName: '[local]--[hash:base64:5]',
              sourceMap: true
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              parser: 'postcss-scss',
              sourceMap: 'inline',
              plugins: (loader) => [
                require('postcss-preset-env')(postCssEnvOptions)
              ]
            }
          },
          {
            loader: require.resolve('sass-loader'),
            options: {
              outputStyle: 'expanded',
              sourceMap: true
            }
          },
          {
            loader: require.resolve('sass-resources-loader'),
            options: {
              resources: scssResourcesLocation
            }
          }
        ]
      }]
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles.[chunkhash:6].css'
      })
    ]
  }
}
module.exports = config
