const merge = require('webpack-merge')
const environment = require('./environment')
const customDevConfig = require('./custom-development')

module.exports = merge(environment.toWebpackConfig(), customDevConfig)
