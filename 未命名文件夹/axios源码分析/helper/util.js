const toString = Object.prototype.toString

// 判断是否为日期对象
export function isDate(val){
  return toString.call(val) === '[object Date]'
}

// 判断是否为对象
export function isObject(val){
  return val !== null && typeof val === 'object'
}

// 判断普通对象
export function isPlainObject(val){
  return toString.call(val) === '[object Object]'
}

export function extend(to, from) {
  for (const key in from) {
    [key] = from[key]
  }
  return to 
}
