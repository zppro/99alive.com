/**
 * Created by zppro on 17-8-22.
 */
import Vue from 'vue'
import { api } from '~/plugins/axios'
import { uaTypes } from './mutation-types'

export const state = () => ({
  apiFragment: '/apps/99alive/ua',
  visibleHeader: false,
  visibleAffix: false,
  hasNewMsg: true,
  menus: {
    // 数据格式查看 https://docs.api.nuxtjs.org/menu/en
    main: [
      {
        title: '合同中心',
        links: [
          {to: '', name: '合同中心'}
        ]
      },
      {
        title: '账号设置',
        links: [
          {to: '/settings/user-info', name: '基本信息'}
        ]
      }
    ]
  },
  _user: {
    name: 'zppro'
  }
})

export const getters = {
  user (state) {
    return state._user
  }
}
export const mutations = {
  toggle (state, key) {
    state[key] = !state[key]
  }
}

export const actions = {

}