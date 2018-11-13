const stylelint = require('stylelint')
const stylelintFormatter = require('stylelint-formatter-pretty')

const styleLintOptions = {
  files: './**/*.scss',
  configFile: require.resolve('@mmtdigital/stylelint-config'),
  formatter: stylelintFormatter,
  fix: true
}

const lint = () => {
  return stylelint.lint(styleLintOptions)
    .then(results => console.log(results.output))
    .catch(console.warn)
}

module.exports = lint
