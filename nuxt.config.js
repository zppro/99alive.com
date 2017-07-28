const axios = require('axios')

const dev = process.env.NODE_ENV !== 'production'

const cdnLink = [
  { rel: 'stylesheet', href: 'https://cdn.bootcss.com/bulma/0.4.3/css/bulma.min.css' },
  // { rel: 'stylesheet', href: 'https://cdn.bootcss.com/element-ui/1.4.0/theme-default/index.css' }
]
const cdnScript = [
  // { src: 'https://cdn.bootcss.com/element-ui/1.4.0/index.js', type: 'text/javascript'}
]

const devUseCSS = [
  'bulma/css/bulma.css',
  // 'element-ui/lib/theme-default/index.css'
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
    'normalize.css',
    ...(dev ? devUseCSS : []),
    { src: '~assets/stylus/main.styl', lang: 'stylus' }
  ],
  // plugins: ['~plugins/vuex-router-sync.js'],
  plugins: ['~plugins/vuex-router-sync.js', '~plugins/element-ui.js'], // { src: '~plugins/element-ui.js', ssr: false}
  build: {
    vendor: ['axios'],
    // vendor: ['axios' ,'element-ui'],
    babel: {
      plugins: [['component', [{
        libraryName: 'element-ui',
        styleLibraryName: 'theme-default'
      }]]]
    }
  },
  loading: { color: '#41B883' }
}
