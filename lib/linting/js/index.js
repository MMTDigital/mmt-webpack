/**
 * For more info on this setup, checkout the standard-engine Github.
 * I can't seem to get a formatter to play nice with standard-engine
 * though. Could potentially switch to the raw eslint cli?
 */

const { join } = require('path')
const eslint = require('eslint')
const pkg = require('../../../package.json')
const standardEngine = require('standard-engine')

const options = {
  version: pkg.version,
  homepage: 'http://docs.mmt.digital',
  bugs: pkg.bugs.url,
  eslint: eslint, // pass any version of eslint >= 1.0.0
  cmd: 'mmt-lint', // should match the "bin" key in your package.json
  tagline: 'Live, love, lint.', // displayed in output --help
  eslintConfig: {
    configFile: join(__dirname, 'eslintrc.json')
  },
  formatter: require('eslint-formatter-pretty'), // This doesn't work yet :(
  fix: true,
  cwd: '' // current working directory, passed to eslint
}

const lint = () => standardEngine.cli(options)
module.exports = lint
