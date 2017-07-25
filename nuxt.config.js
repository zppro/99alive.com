const axios = require('axios')

const dev = process.env.NODE_ENV !== 'production'

const cdnLink = [{ rel: 'stylesheet', href: 'https://cdn.bootcss.com/bulma/0.4.3/css/bulma.min.css' }]

const devUseCSS = ['bulma/css/bulma.css'];

module.exports = {
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: `dev ${dev}-${this.dev}` }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ...(dev ? [] : cdnLink)
    ]
  },
  css: [
    'normalize.css',
    ...(dev ? devUseCSS : []),
    { src: '~assets/stylus/main.styl', lang: 'stylus' }
  ],
  plugins: [],
  build: {
    vendor: ['axios']
  },
  loading: { color: '#41B883' }
}
