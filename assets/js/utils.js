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

export const isPhone = o => /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|177)[0-9]{8}$/.test(o);

export const scrollTop = () => {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || window.scrollY || 0
}

export const offsetY = (dom) => {
  if (isString(dom)) {
    return document.getElementById(dom).offsetTop || document.getElementById(dom).scrollTop || document.getElementById(dom).clientTop || 0
  } else if (isObject(dom)) {
    return dom.offsetTop || dom.scrollTop || dom.clientTop || 0
  }
  return 0
}