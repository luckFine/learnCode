import { parseHeaders } from '../helper/headers'
import { createError } from '../helper/error'

// 创建 XMLHttpRequest
export default function xhr(config) {
  return new Promise((resolve, reject) => {
    const { url, data = null, method = 'get', headers, responseType, timeout } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toUpperCase(), url!, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }

    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }

    request.ontimeout = function handleTime() {
      reject(createError(`Timout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)

    function handleResponse(response) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed width status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
