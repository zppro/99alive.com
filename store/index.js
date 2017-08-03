/**
 * Created by zppro on 17-7-27.
 */
import axios from 'axios'
import { tpaPrefix } from './module-prefixs'
import { indexTypes, tpaTypes } from './mutation-types'

export const state = () => ({
  _$keys: {},
  _channels: [
    {name: '养老机构', path: '/tpa'},
    {name: '为老服务', path: '/srv'},
    {name: '照护人才', path: '/tnm'},
    {name: '招聘信息', path: '/job'}
  ],
  _cities: [],
  _currentCity: {id: '010100', name: '杭州'}
})

export const getters = {
  $keys (state) {
    return state._$keys
  },
  channels (state) {
    return state._channels
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
  async nuxtServerInit ({state, getters, commit}, {app, isServer}) {
    try {
      console.log('--------------------nuxtServerInit:')
      await axios.all([
        app.api(`/share/keys.json`),
        app.api(`/share/district/cities/,_id name first_letter hot`),
        ...state.tpa._searchDimensionIds.map(o => app.api(`/share/dictionary/${o}/pair`))
      ]).then(axios.spread(($keys, cities, ...searchDimensions) => {
        commit(indexTypes.SET_$KEYS, $keys)
        commit(indexTypes.SET_CITIES, cities)
        commit(tpaPrefix + tpaTypes.SET_SEARCH_DIMENSIONS, searchDimensions)
      }))
      // const cities = await app.api(`/share/district/cities/,_id name first_letter hot`)
      // console.log('ret:', cities, bedNumSearchDimension, chargeSearchDimentsion, ratingSearchDimension)

      // console.log('groupedCities:', getters['groupedCities'])
    } catch (e) {
      // console.error('Error on [nuxtServerInit] action.', e) // eslint-disable-line no-console
    }
  },
  switchCity ({state, commit}, cityId) {
    commit(indexTypes.SET_CITY, state._cities.find(c => c._id === cityId))
    return Promise.resolve()
  }
}