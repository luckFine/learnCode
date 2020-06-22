import xhr from './xhr'
import { buildURL } from '../helper/url'
import { transformRequest, transformResponse } from '../helper/data'
import { processHeaders } from '../helper/headers'

// typescript axios
export default function dispatchRequest(config) {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

// 处理参数
function processConfig(config) {
  // 转换URL
  config.url = transformURL(config)
  // 处理headers
  config.headers = transformHeaders(config)
  // 处理数据
  config.data = transformRequestData(config)
}

// 转换URL
function transformURL(config){
  const { url, params } = config
  return buildURL(url, params)
}

// 处理headers
function transformHeaders(config) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

// 处理数据
function transformRequestData(config) {
  return transformRequest(config.data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}

