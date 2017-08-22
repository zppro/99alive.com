/**
 * Created by zppro on 17-7-27.
 */
import Vue from 'vue'
import { api } from '~/plugins/axios'
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
  ],
  _queryOrders: [
    {id: 'default', name: '默认排序', orderBy: ''},
    {id: 'recently', name: '最新加入', orderBy: '-check_in_time'},
    {id: 'chargeAdvertised', name: '收费标准', orderBy: '-charge_advertised'}
  ],
  _agencies: [],
  _currentAgency: {
    id: '',
    imgs: [
      'https://img2.okertrip.com/99alive-alpha/1.png',
      'https://img2.okertrip.com/99alive-alpha/2.png',
      'https://img2.okertrip.com/99alive-alpha/3.jpg'
    ],
    name: 'XX养老机构',
    address: 'XX',
    city: 'XX市',
    nature: '公办/民办/民非',
    type: '老年社会福利院/养老院/老年公寓...', // /护老院/护养院/敬老院/托老所/老年人服务中心
    publish_on: 'XXXX年XX月',
    service_object: '自理/介助/介护',
    fee_range: '2000以下/2000-2999/3000-3999...', // /4000-4999/5000-7999/8000-9999/1万以上
    bed_num_range: '10以下/10-49/50-199...', // /200-499/500以上
    star_rank: '一星级/二星级/三星级...', // /四星级/五星级
    link_man: '张XX',
    link_phone: '13XXXXXXX123',
    intro: '介绍...',
    link_info: '联系方式...',
    reputation: 'LAZY_LOAD'
  }
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
  },
  queryOrders (state) {
    return state._queryOrders
  },
  agencies (state) {
    return state._agencies
  },
  currentAgency (state) {
    return state._currentAgency
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
  },
  [tpaTypes.SET_AGENCIES] (state, agencies) {
    agencies && (state._agencies = agencies)
  },
  [tpaTypes.SET_CURRENT_AGENCY] (state, agency) {
    agency && (state._currentAgency = agency)
  }
}

export const actions = {
  async fetchStats ({state, commit}) {
    const stats = await api(`${state.apiFragment}/stats`)
    commit(tpaTypes.SET_STATS, stats)
  },
  async fetchSlidersInIndex ({state, commit}) {
    const sliders = await api(`${state.apiFragment}/slidersInIndex`)
    commit(tpaTypes.SET_SLIDERS, sliders)
  },
  async fetchTabsInIndex ({state, commit}) {
    const tabs = await api(`${state.apiFragment}/tabsInIndex`)
    commit(tpaTypes.SET_TABS, tabs)
  },
  async fetchAgenciesInIndex ({rootGetters, state, commit}, {id, data}) {
    if(rootGetters.$keys.LAZY_LOAD === data) {
      const agencies = await api(`${state.apiFragment}/${id}AgenciesInIndex`)
      commit(tpaTypes.SET_TAB_AGENCIES, {id, agencies})
    }
  },
  async fetchAgenciesInQuery ({state, commit}) {
    const agencies = await api(`${state.apiFragment}/agenciesInQuery`)
    commit(tpaTypes.SET_AGENCIES, agencies)
  },
  async fetchAgencyInDetails ({state, commit}, id) {
    console.log('fetchAgencyInDetails:', id)
    if (id === state._currentAgency.id) return
    const agency = await api(`${state.apiFragment}/agencyInDetails/${id}`)
    commit(tpaTypes.SET_CURRENT_AGENCY, agency)
  }
}