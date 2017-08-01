/**
 * Created by zppro on 17-7-27.
 */
import {INDEX as types} from './mutation-types'

export const state = () => ({
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
  [types.SET_CITY] (state, city) {
    city && (state._currentCity = city)
  },
  [types.SET_CITIES] (state, cities = []) {
    state._cities = cities
  }
}

export const actions = {
  async nuxtServerInit ({state, getters, commit}, {app, isServer}) {
    try {
      console.log('nuxtServerInit:')
      const cities = await app.api(`/share/district/cities/,_id name first_letter hot`)
      commit(types.SET_CITIES, cities)
      console.log('groupedCities:', getters['groupedCities'])
    } catch (e) {
      console.error('Error on [nuxtServerInit] action.', e) // eslint-disable-line no-console
    }
  },
  switchCity ({state, commit}, cityId) {
    commit(types.SET_CITY, state._cities.find(c => c._id === cityId))
    return Promise.resolve()
  }
}