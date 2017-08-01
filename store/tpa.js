/**
 * Created by zppro on 17-7-27.
 */
import { endpoint } from '~/plugins/axios'
import {TPA as types} from './mutation-types'

export const state = () => ({
  apiFragment: '/apps/99alive/tpa',
  _columns: [
    {name: '首页', path: '/tpa'},
    {name: '查找', path: '/tpa/query'},
    {name: '对比', path: '/tpa/compare'},
  ], // 当前频道栏目
  _stats: { tpaNumbers: 11 }
})

export const getters = {
  columns (state) {
    return state._columns
  },
  numbers (state) {
    return state._stats.tpaNumbers || 0
  }
}
export const mutations = {
  [types.SET_STATS] (state, stats) {
    stats && (state._stats = stats)
  }
}

export const actions = {
  async fetchStats ({state, commit}, o) {
    console.log('fetchStats:', o);
    let stats = await endpoint.api(`${state.apiFragment}/stats`)
    commit(types.SET_STATS, stats)
  }
}