process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')

plugins: [
    new webpack.IgnorePlugin(/jsdom$/)
]

module.exports = environment.toWebpackConfig()
