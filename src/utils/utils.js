import store from '@/store'
import VueCookie from 'vue-cookie'

/**
 * 移除对象的指定属性
 * @param {*} obj
 * @param {*} uselessKeys
 */
const omit = (obj, uselessKeys) => {
  uselessKeys.forEach(key => {
    delete obj[key]
  })
  return obj
}

/**
 * 清除登录信息
 */
export function clearLoginInfo () {
  VueCookie.delete('token')
  store.commit('clear')
}

export {
  omit
}
