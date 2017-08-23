const axios = require('axios')
const dev = process.env.NODE_ENV !== 'production'

const cdnLink = [
  {rel: 'stylesheet', href: 'https://cdn.bootcss.com/normalize/7.0.0/normalize.min.css'},
  {rel: 'stylesheet', href: 'https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css'}
  // {rel: 'stylesheet', href: 'https://cdn.bootcss.com/bulma/0.4.3/css/bulma.min.css'}
]
const cdnScript = []

const devUseCSS = [
  'normalize.css',
  // '~static/bulma.css',
  'font-awesome/css/font-awesome.css'
]

module.exports = {
  // mode: 'spa',
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
    '~static/bulma.css',
    '~static/bulma-badge.css',
    '~static/iconfont.css',
    { src: '~assets/stylus/main.styl', lang: 'stylus' }
  ],
  env: {
    API_BASE_URL: process.env.API_BASE_URL || 'http://192.168.10.194:3003/apis/'
  },
  plugins: ['~plugins/vue-validator.js', '~plugins/vuex-router-sync.js', '~plugins/axios.js'],
  build: {
    // dll: true,
    vendor: ['axios', 'babel-polyfill'],
    babel: {
      plugins: ['transform-function-bind']
    }
  },
  router: {
    scrollBehavior: function (to, from, savedPosition) {
      return false
    }
  },
  loading: { color: '#41B883' }
}
