/**
 * 提取某个对象中的指定属性
 * @param {Object} obj 被提取的对象
 * @param {Array<string>} arr 要提取的属性
 * @return {Object}
 */

export const pick = (obj, arr) =>
  arr.reduce((iter, val) => (val in obj && (iter[val] = obj[val]), iter), {})
