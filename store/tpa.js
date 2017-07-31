/**
 * Created by zppro on 17-7-27.
 */
import axios from 'axios'

export const state = () => ({
  apiFragment: '/apps/99alive/tpa',
  _columns: [
    {name: '首页', path: '/tpa'},
    {name: '查找', path: '/tpa/query'},
    {name: '对比', path: '/tpa/compare'},
  ], // 当前频道栏目
  _stats: {}
})

export const getters = {
  columns (state) {
    return state._columns
  },
  stats (state) {
    return state._stats
  }
}
export const mutations = {
  setStats (state, stats) {
    console.log('setStats:', stats)
    stats && (state._stats = stats)
  }
}

export const actions = {
  async fetchStats ({state, commit}) {
    let stats = await axios(`${state.apiFragment}/stats`)
    commit('setStats', stats)
    return Promise.resolve()
  }
}