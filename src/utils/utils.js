
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

export {
  omit
}
