/**
 * Created by zppro on 17-8-22.
 */
import Vue from 'vue'
import { api } from '~/plugins/axios'
import { uaTypes } from './mutation-types'

const defaultUser = {
  id: 'anonymity',
  name: 'anonymity'
}

const defaultAuth = {
  token: '',
  path: '/user-admin', //认证的根路径
  tested: false,
  return_url: '/user-admin' //认证成功返回路径
}

export const state = () => ({
  apiFragment: 'apps/99alive/user-admin',
  visibleHeader: false,
  visibleAffix: false,
  hasNewMsg: true,
  menus: {
    // 数据格式查看 https://docs.api.nuxtjs.org/menu/en
    main: [
      {
        title: '订单与合同',
        links: [
          {to: '/order-and-contract/my-application', name: '我的申请'},
          {to: '/order-and-contract/my-order', name: '我的订单'},
          {to: '/order-and-contract/my-contract', name: '我的合同'},
          {to: '/order-and-contract/my-evaluation', name: '我的评价'}
        ]
      },
      {
        title: '关注中心',
        links: [
          {to: '/focus/tpa', name: '养老机构'},
          {to: '/focus/sfto', name: '为老服务'},
          {to: '/focus/care-man', name: '照护人员'},
          {to: '/focus/browsing-history', name: '浏览历史'}
        ]
      },
      {
        title: '资产中心',
        links: [
          {to: '/asset/coupon ', name: '优惠券'}
        ]
      },
      {
        title: '账号设置',
        quickBase: '/user-admin/main',
        links: [
          {to: '/settings/user-info', name: '基本信息'},
          {to: '/settings/change-pass', name: '修改密码', quickIndex: 2},
          {to: '/settings/change-avatar', name: '修改头像', quickIndex: 3},
          {to: '/settings/real-name-authentication', name: '实名认证', quickIndex: 1}
        ]
      }
    ]
  },
  _user: defaultUser,
  auth: defaultAuth
})

export const getters = {
  isAuth (state) {
    return state.auth.tested
  },
  user (state) {
    return state._user
  },
  quickSettings (state) {
    let mainSettings = state.menus.main.find(o => o.title === '账号设置')
    return mainSettings.links.filter(o => !!o.quickIndex).sort((a,b) => a.quickIndex > b.quickIndex).map(o =>({to: mainSettings.quickBase + o.to, name: o.name}))
  }
}
export const mutations = {
  toggle (state, key) {
    state[key] = !state[key]
  },
  [uaTypes.SET_TOKEN] (state, token) {
    if (token) {
      state.auth.token = token
      state.auth.tested = true
    } else {
      state.auth.token = ''
      state.auth.tested = false
    }
  },
  [uaTypes.SET_USER] (state, {id, name}) {
    name && (state._user.name = name)
  },
  [uaTypes.SET_AUTH_RETURN_URL] (state, {return_url}) {
    return_url && (state.auth.return_url = return_url)
  },
  [uaTypes.CLEAR_USER_TOKEN] (state) {
    state._user = defaultUser
    state.auth = defaultAuth
  }
}

export const actions = {
  async login ({dispatch, state, commit}, {username, pass}) {
    const {user, token} = await api.post(`/share/auth/signin`, {path: state.apiFragment, username, pass})
    // const user = await api.post(`/${state.apiFragment}/signin`, {path: state.apiFragment, username, pass})
    commit(uaTypes.SET_USER, user)
    commit(uaTypes.SET_TOKEN, token)
    return true
  },
  async logout ({dispatch, state, commit}) {
    await api.post(`/share/auth/signout`, {path: state.apiFragment})
    // const user = await api.post(`/${state.apiFragment}/signin`, {path: state.apiFragment, username, pass})
    commit(uaTypes.CLEAR_USER_TOKEN)
    return true
  },
  async signinByToken ({state, commit}, {token, signin_ts}) {
    // const {user, token} = await api.post(`/share/auth/token`, {token})
    // const user = await api.post(`/${state.apiFragment}/signin`, {path: state.apiFragment, username, pass})
    let user = await api(`/share/auth/signinByToken/${token},${signin_ts}`)

    if (user) {
      commit(uaTypes.SET_USER, user)
      commit(uaTypes.SET_TOKEN, token)
      console.log('token func:', state.auth)

    }
    return !!user
  }
}