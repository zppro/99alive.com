/**
 * Created by zppro on 17-7-27.
 */

export const state = () => ({
  counter: 0
})

export const mutations = {
  increment (state) {
    state.counter++
  }
}