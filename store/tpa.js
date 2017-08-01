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
  _stats: { tpaNumbers: 11 },
  _searchDimensions: []
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
  }
}
export const mutations = {
  [tpaTypes.SET_STATS] (state, stats) {
    stats && (state._stats = stats)
  },
  [tpaTypes.SET_SEARCH_DIMENSIONS] (state, searchDimensions) {
    searchDimensions && (state._searchDimensions = searchDimensions)
    console.log('state._searchDimensions:', state._searchDimensions)
  }
}

export const actions = {
  async fetchStats ({state, commit}) {
    let stats = await endpoint.api(`${state.apiFragment}/stats`)
    commit(tpaTypes.SET_STATS, stats)
  }
}