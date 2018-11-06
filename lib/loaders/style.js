const resolve = require('resolve')
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
        { loader: MiniCssExtractPlugin.loader },
        { loader: require.resolve('css-loader') },
        // {
        //   loader: require.resolve('postcss-loader'),
        //   options: {
        //     parser: 'postcss-scss',
        //     config: {
        //       path: '../../postcss.config.js'
        //     }
        //   }
        // },
        {
          loader: require.resolve('sass-loader'),
          options: {
            outputStyle: 'expanded'
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
