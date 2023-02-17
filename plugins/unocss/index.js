const Unocss = require('unocss/vite').default

const config = require('./config')

module.exports = () => Unocss(config)