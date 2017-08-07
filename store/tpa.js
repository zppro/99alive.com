/**
 * Created by zppro on 17-7-27.
 */
import Vue from 'vue'
import { endpoint } from '~/plugins/axios'
import { tpaTypes } from './mutation-types'

export const state = () => ({
  apiFragment: '/apps/99alive/tpa',
  _columns: [
    {name: '首页', path: '/tpa'},
    {name: '查找', path: '/tpa/query'},
    {name: '对比', path: '/tpa/compare'},
  ], // 当前频道栏目
  _stats: {tpaNumbers: 11},
  _searchDimensionIds: ['99A01', '99A02', '99A03','99A04', '99A05', '99A06'],
  _searchDimensions: [],
  _quickSearchDimensionIds: ['99A02', '99A03', '99A04', '99A05'],
  _queryMultiDimensionIds: ['99A03', '99A04'],
  _sliders: [
    {id: 'slider1', img: 'https://img2.okertrip.com/99alive-alpha/1.png'},
    {id: 'slider2', img: 'https://img2.okertrip.com/99alive-alpha/2.png'},
    {id: 'slider3', img: 'https://img2.okertrip.com/99alive-alpha/3.jpg'}
  ],
  _tabs: [
    {id: 'recommend', name: '为您推荐', data: 'LAZY_LOAD'},
    {id: 'recently', name: '最近加入', data: 'LAZY_LOAD'}
  ]
})

export const getters = {
  columns (state) {
    return state._columns
  },
  numbers (state) {
    return state._stats.tpaNumbers || 0
  },
  searchDimensions (state) {
    return state._searchDimensions
  },
  quickSearchDimensions (state) {
    return state._searchDimensions.filter(o => state._quickSearchDimensionIds.includes(o.key))
  },
  queryMultiDimensionIds (state) {
    return state._queryMultiDimensionIds
  },
  sliders (state) {
    return state._sliders
  },
  tabs (state) {
    return state._tabs
  }
}
export const mutations = {
  [tpaTypes.SET_STATS] (state, stats) {
    stats && (state._stats = stats)
  },
  [tpaTypes.SET_SEARCH_DIMENSIONS] (state, searchDimensions) {
    searchDimensions && (state._searchDimensions = searchDimensions)
  },
  [tpaTypes.SET_SLIDERS] (state, sliders) {
    sliders && (state._sliders = sliders)
  },
  [tpaTypes.SET_TABS] (state, tabs) {
    tabs && (state._tabs = tabs)
  },
  [tpaTypes.SET_TAB_AGENCIES] (state, {id, agencies}) {
    let tab = state._tabs.find(o => o.id === id)
    tab && Vue.set(tab, 'data', agencies)
  }
}

export const actions = {
  async fetchStats ({state, commit}) {
    const stats = await endpoint.api(`${state.apiFragment}/stats`)
    commit(tpaTypes.SET_STATS, stats)
  },
  async fetchSlidersInIndex ({state, commit}) {
    const sliders = await endpoint.api(`${state.apiFragment}/slidersInIndex`)
    commit(tpaTypes.SET_SLIDERS, sliders)
  },
  async fetchTabsInIndex ({state, commit}) {
    const tabs = await endpoint.api(`${state.apiFragment}/tabsInIndex`)
    commit(tpaTypes.SET_TABS, tabs)
  },
  async fetchAgenciesInIndex ({rootGetters, state, commit}, {id, data}) {
    if(rootGetters.$keys.LAZY_LOAD === data) {
      const agencies = await endpoint.api(`${state.apiFragment}/${id}AgenciesInIndex`)
      commit(tpaTypes.SET_TAB_AGENCIES, {id, agencies})
    }
  }
}