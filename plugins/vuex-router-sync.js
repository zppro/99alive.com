/**
 * Created by zppro on 17-7-27.
 */
import { sync } from 'vuex-router-sync'
export default ({app: {store, router}}) => {
  sync(store, router)
}