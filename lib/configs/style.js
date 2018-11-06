const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const resolve = require('resolve')

const defaultPostCssEnvOptions = {
  stage: 0,
  browsers: [
    'last 2 versions',
    'IE >= 9',
    'safari >= 8'
  ]
}

const config = (options, mmtConfig) => {
  const postCssEnvOptions = mmtConfig.postCssEnvOptions || defaultPostCssEnvOptions

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
          // {
          //   loader: require.resolve('sass-resources-loader'),
          //   options: {
          //     resources: [ './src/styles/resources/all.scss' ]
          //   }
          // }
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
