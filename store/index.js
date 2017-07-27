/**
 * Created by zppro on 17-7-27.
 */

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
  }
}

export const mutations = {
  setCity (state, city) {
    city && (state._currentCity = city)
  }
}

export const actions = {
  switchCity ({ state, commit }, cityId) {
    commit('setCity', state._cities.find(c => c.id === cityId))
  }
}