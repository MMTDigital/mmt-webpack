const resolve = require('resolve')
const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
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
            plugins: [
              autoprefixer({
                browsers: [
                  'last 2 versions',
                  'IE >= 9',
                  'safari >= 8'
                ]
              })
            ]
          }
          // options: {
          //   parser: 'postcss-scss',
          //   config: {
          //     path: '../../postcss.config.js'
          //   }
          // }
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
