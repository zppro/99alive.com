/**
 * Created by zppro on 17-7-27.
 */

export const state = () => ({
  _columns: [
    {name: '首页', path: '/tpa'},
    {name: '查找', path: '/tpa/query'},
    {name: '对比', path: '/tpa/compare'},
  ] // 当前频道栏目
})

export const getters = {
  columns (state) {
    return state._columns
  }
}