/**
 * Created by zppro on 17-7-27.
 */
import Vue from 'vue'
import { Dialog } from 'element-ui'

if (process.BROWSER_BUILD) {
  Vue.use(Dialog)
  // Vue.use(require('element-ui')) // all components
}