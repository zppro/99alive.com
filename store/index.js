/**
 * Created by zppro on 17-7-27.
 */
import axios from 'axios'
import { parseCookie } from '~/assets/js/utils'
import { tpaPrefix, uaPrefix } from './module-prefixs'
import { indexTypes, tpaTypes } from './mutation-types'

export const state = () => ({
  _$keys: {},
  _site: {
    name: '99为老网',
    domain: '99alive.com',
    _channels: [
      {name: '养老机构', path: '/tpa'},
      {name: '为老服务', path: '/srv'},
      {name: '照护人才', path: '/tnm'},
      {name: '招聘信息', path: '/job'}
    ],
    _commonNavItems: [
      {name: '关于我们', path: '/about-us'},
      {name: '联系我们', path: '/contact-us'},
      {name: '加盟合作', path: '/join-us'},
      {name: '推广计划', path: '/promotion-planning'},
      {name: '网站声明', path: '/statement'}
    ],
    _signs: [
      {name: '登录', path: '/login'},
      {name: '欢迎注册', path: '/reg/person'},
      {name: '欢迎注册', path: '/reg/agency'}
    ]
  },
  _cities: [],
  _currentCity: {id: '010100', name: '杭州'},
  version: '0.10.7',
  ghVersion: '0.10.7',
  visibleHeader: false,
  visibleAffix: false,
  apiURI: 'https://docs.api.nuxtjs.org',
  _lang: 'en',
  lang: {},
  menu: {}
})

export const getters = {
  $keys (state) {
    return state._$keys
  },
  channels (state) {
    return state._site._channels
  },
  commonNavItems (state) {
    return state._site._commonNavItems
  },
  currentSign (state) {
    return state._site._signs.find(o => state.route.path.endsWith(o.path))
  },
  siteName (state) {
    return state._site.name
  },
  siteDomain (state) {
    return state._site.domain
  },
  currentChannelId (state) {
    return state.route.path.split('/')[1]
  },
  currentCityId (state) {
    return state._currentCity.id
  },
  currentCityName (state) {
    return state._currentCity.name
  },
  hotCities (state) {
    return state._cities.filter(city => city.hot)
  },
  groupedCities (state) {
    return state._cities.reduce((g, city) => {
      let key = city['first_letter']
      let keys = Object.keys(g)
      if(!keys.includes(key)){
        g[key] = []
      }
      g[key].push(city)
      return g
    }, {})
  }
}

export const mutations = {
  [indexTypes.SET_$KEYS] (state, $keys) {
    $keys && (state._$keys = $keys)
  },
  [indexTypes.SET_CITY] (state, city) {
    city && (state._currentCity = city)
  },
  [indexTypes.SET_CITIES] (state, cities = []) {
    state._cities = cities
  }
}

export const actions = {
  async nuxtServerInit ({state, commit, dispatch}, {app, req, res}) {
    try {
      console.log('--------------------nuxtServerInit:')
      let urls = [
        app.api(`/share/keys.json`),
        app.api(`/share/district/cities/,_id name first_letter hot`),
        ...state.tpa._searchDimensionIds.map(o => app.api(`/share/dictionary/${o}/pair`))
      ]
      // console.log('urls: ', urls)
      await axios.all(urls).then(axios.spread(($keys, cities, ...searchDimensions) => {
        commit(indexTypes.SET_$KEYS, $keys)
        commit(indexTypes.SET_CITIES, cities)
        commit(tpaPrefix + '/'+ tpaTypes.SET_SEARCH_DIMENSIONS, searchDimensions)
      }))

      let token  = parseCookie(req.headers.cookie, 'token')
      let signin_ts  = parseCookie(req.headers.cookie, 'signin_ts')
      console.log('token:', token, signin_ts)
      if (token && signin_ts) {
        await dispatch(`${uaPrefix}/token`, {token, signin_ts})
      }

    } catch (e) {
      // console.error('Error on [nuxtServerInit] action.', e) // eslint-disable-line no-console
    }
  },
  switchCity ({state, commit}, cityId) {
    commit(indexTypes.SET_CITY, state._cities.find(c => c._id === cityId))
    return Promise.resolve()
  }
}