const config = (options, mmtConfig) => {
  return {
    module: {
      rules: [
        {
          test: /\.(js|jsx|mjs)$/,
          exclude: /node_modules/,
          rules: [
            // {
            //   enforce: 'pre',
            //   loader: 'standard-loader',
            //   options: {
            //     error: false,
            //     parser: 'babel-eslint',
            //     snazzy: true
            //   }
            // },
            {
              loader:  require.resolve('babel-loader'),
              options: {
                sourceMaps: 'both',
                presets: [
                  [
                    require.resolve('@babel/preset-env'), {
                      'useBuiltIns': 'entry'
                    }
                  ]
                ],
                plugins: [
                  require.resolve('@babel/plugin-proposal-class-properties'),
                  [require.resolve('@babel/plugin-proposal-decorators'), {
                      decoratorsBeforeExport: true
                    }
                  ],
                  [require.resolve('babel-plugin-module-resolver'), {
                      "root": ['./'],
                      "alias": {
                        "@root": "./src",
                        "@assets": "./src/assets.js",
                        "@icons": "./src/assets/icons",
                        "@fonts": "./src/assets/fonts",
                        "@images": "./src/assets/images",
                        "@components": "./src/components",
                        "@polyfills": "./src/polyfills.js",
                        "@styles": "./src/styles/styles.scss"
                      }
                    }
                  ]
                ]
              }
            }
          ]
        }
      ]
    }
  }
}

module.exports = config
