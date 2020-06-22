import { isPlainObject } from './util'

export function transformRequest(data) {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }

  return data
}

// 处理响应data
export function transformResponse(data) {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}
