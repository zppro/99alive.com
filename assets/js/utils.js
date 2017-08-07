/**
 * Created by zppro on 17-8-7.
 */
import 'babel-polyfill'
export const isString = o => {
  return Object.prototype.toString.call(o) == '[object String]';
}

export const isObject = o => {
  return o === Object(o);
}

export const isFunction = o => {
  let getType = {};
  return o && getType.toString.call(o) === '[object Function]';
}