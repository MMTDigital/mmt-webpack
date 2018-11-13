#!/usr/bin/env node

/**
 * Note that linting as part of the build is handled by Webpack
 * (using the same configs). This is a CLI for linting on the
 * fly. This is used mainly for git hooks (husky + lint-staged)
 */

const lintStyles = require('./linting/styles')
const lintJs = require('./linting/js')
lintStyles().then(lintJs)
