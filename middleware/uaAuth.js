/**
 * Created by zppro on 17-8-23.
 */
import { uaPrefix } from '~/store/module-prefixs'

export default function ({ store, route, redirect }) {
  // Add the userAgent property in the context (available in `data` and `fetch`)
  console.log(route.path)
  let uaAuth = store.state[uaPrefix].auth
  if (uaAuth && route.path.startsWith(uaAuth.path)) {
    if (!uaAuth.tested) {

      return redirect('/login')
    }
  }
}