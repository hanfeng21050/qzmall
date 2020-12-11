import Vue from 'vue'

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
  Vue.cookie.delete('token')
}

export {
  omit
}
