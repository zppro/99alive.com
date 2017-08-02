/**
 * Created by zppro on 17-7-27.
 */
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
  _searchDimensionIds: ['99A01', '99A02', '99A03'],
  _searchDimensions: [],
  _quickSearchDimensionIds: ['99A01', '99A02', '99A03'],
  _sliders: [
    {id: 'slider1', img: 'https://img2.okertrip.com/99alive-alpha/1.png'},
    {id: 'slider2', img: 'https://img2.okertrip.com/99alive-alpha/2.png'},
    {id: 'slider3', img: 'https://img2.okertrip.com/99alive-alpha/3.jpg'}
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
  sliders (state) {
    return state._sliders
  }
}
export const mutations = {
  [tpaTypes.SET_STATS] (state, stats) {
    stats && (state._stats = stats)
  },
  [tpaTypes.SET_SEARCH_DIMENSIONS] (state, searchDimensions) {
    searchDimensions && (state._searchDimensions = searchDimensions)
    console.log('state._searchDimensions:', state._searchDimensions)
  },
  [tpaTypes.SET_SLIDERS] (state, sliders) {
    sliders && (state._sliders = sliders)
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
  }
}