import dispatchRequest from './dispatchRequest'

export default class Axios {
  request() {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url

    } else {
      config = url
    }
    return dispatchRequest(config)
  }

  get(url, config){
    return this._requestMethodsWithoutData('get', url, config)
  }

  delete(url, config){
    return this._requestMethodsWithoutData('delete', url, config)
  }

  head(url, config){
    return this._requestMethodsWithoutData('head', url, config)
  }

  options(url, config){
    return this._requestMethodsWithoutData('options', url, config)
  }

  post(url, data, config){
    return this._requestMethodsWithData('post', url, data, config)
  }

  put(url, data, config){
    return this._requestMethodsWithData('put', url, data, config)
  }

  patch(url, data, config){
    return this._requestMethodsWithData('patch', url, data, config)
  }

  _requestMethodsWithoutData(method, url, config) {
    return this.request(Object.assign(config || {}, {
      method,
      url
    }))
  }

  _requestMethodsWithData(method, url, data, config) {
    return this.request(Object.assign(config || {}, {
      method,
      url,
      data
    }))
  }
}


