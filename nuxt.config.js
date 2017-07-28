const axios = require('axios')

const dev = process.env.NODE_ENV !== 'production'

const cdnLink = [
  { rel: 'stylesheet', href: 'https://cdn.bootcss.com/normalize/7.0.0/normalize.min.css' },
  { rel: 'stylesheet', href: 'https://cdn.bootcss.com/bulma/0.4.3/css/bulma.min.css' }
]
const cdnScript = []

const devUseCSS = [
  'normalize.css',
  '~static/bulma.css'
]

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
    ],
    // script: [
    //   ...(dev ? [] : cdnScript)
    // ]
  },
  css: [
    ...(dev ? devUseCSS : []),
    { src: '~assets/stylus/main.styl', lang: 'stylus' }
  ],
  plugins: ['~plugins/vuex-router-sync.js'],
  build: {
    vendor: ['axios'],
    // babel: {
    //   plugins: [['component', [{
    //     libraryName: 'element-ui',
    //     styleLibraryName: 'theme-default'
    //   }]]]
    // }
  },
  loading: { color: '#41B883' }
}
