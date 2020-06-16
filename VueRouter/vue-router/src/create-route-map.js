/* @flow */

import Regexp from 'path-to-regexp'
import { cleanPath } from './util/path'
import { assert, warn } from './util/warn'

export function createRouteMap (
  routes: Array<RouteConfig>,
  oldPathList?: Array<string>,
  oldPathMap?: Dictionary<RouteRecord>,
  oldNameMap?: Dictionary<RouteRecord>
): {
  pathList: Array<string>,
  pathMap: Dictionary<RouteRecord>,
  nameMap: Dictionary<RouteRecord>
} {
  // the path list is used to control path matching priority
  const pathList: Array<string> = oldPathList || []
  // $flow-disable-line
  const pathMap: Dictionary<RouteRecord> = oldPathMap || Object.create(null)
  // $flow-disable-line
  const nameMap: Dictionary<RouteRecord> = oldNameMap || Object.create(null)
  // routes是一个数组，拿到路由配置的对象
  routes.forEach(route => {
    addRouteRecord(pathList, pathMap, nameMap, route)
  })

  // ensure wildcard routes are always at the end
  // 匹配通配符，把通配符放在结尾 调整优先级
  for (let i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0])
      l--
      i--
    }
  }

  // if (process.env.NODE_ENV === 'development') {
  //   // warn if routes do not include leading slashes
  //   const found = pathList
  //   // check for missing leading slash
  //     .filter(path => path && path.charAt(0) !== '*' && path.charAt(0) !== '/')

  //   if (found.length > 0) {
  //     const pathNames = found.map(path => `- ${path}`).join('\n')
  //     warn(false, `Non-nested routes must include a leading slash character. Fix the following routes: \n${pathNames}`)
  //   }
  // }
  // 返回映射关系
  return {
    pathList,
    pathMap,
    nameMap
  }
}

function addRouteRecord (
  pathList: Array<string>,
  pathMap: Dictionary<RouteRecord>,
  nameMap: Dictionary<RouteRecord>,
  route: RouteConfig,
  parent?: RouteRecord,
  matchAs?: string
) {
  // 拿到配置的path和name
  const { path, name } = route
  // 路径的正则配置
  const pathToRegexpOptions: PathToRegexpOptions =
    route.pathToRegexpOptions || {}
  // 
  const normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict)

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive
  }
// 路由的匹配信息
  const record: RouteRecord = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name,
    parent,
    matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props:
      route.props == null
        ? {}
        : route.components
          ? route.props
          : { default: route.props }
  }
  // 当定义了二级路由的时候
  if (route.children) {
    // 递归调用addRouteRecord 记录路由信息RouteRecord
    route.children.forEach(child => {
      const childMatchAs = matchAs
        ? cleanPath(`${matchAs}/${child.path}`)
        : undefined
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs)
    })
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path)
    pathMap[record.path] = record
  }

  // if (route.alias !== undefined) {
  //   const aliases = Array.isArray(route.alias) ? route.alias : [route.alias]
  //   for (let i = 0; i < aliases.length; ++i) {
  //     const alias = aliases[i]
  //     if (process.env.NODE_ENV !== 'production' && alias === path) {
  //       warn(
  //         false,
  //         `Found an alias with the same value as the path: "${path}". You have to remove that alias. It will be ignored in development.`
  //       )
  //       // skip in dev to make it work
  //       continue
  //     }

  //     const aliasRoute = {
  //       path: alias,
  //       children: route.children
  //     }
  //     addRouteRecord(
  //       pathList,
  //       pathMap,
  //       nameMap,
  //       aliasRoute,
  //       parent,
  //       record.path || '/' // matchAs
  //     )
  //   }
  // }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record
    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
      warn(
        false,
        `Duplicate named routes definition: ` +
          `{ name: "${name}", path: "${record.path}" }`
      )
    }
  }
}

function compileRouteRegex (
  path: string,
  pathToRegexpOptions: PathToRegexpOptions
): RouteRegExp {
  const regex = Regexp(path, [], pathToRegexpOptions)
  if (process.env.NODE_ENV !== 'production') {
    const keys: any = Object.create(null)
    regex.keys.forEach(key => {
      warn(
        !keys[key.name],
        `Duplicate param keys in route with path: "${path}"`
      )
      keys[key.name] = true
    })
  }
  return regex
}

function normalizePath (
  path: string,
  parent?: RouteRecord,
  strict?: boolean
): string {
  // 替换调结尾的斜线
  if (!strict) path = path.replace(/\/$/, '')
  // 路径以/开头 绝对路径 直接返回
  if (path[0] === '/') return path
  if (parent == null) return path
  // 避免拼接错误的函数
  return cleanPath(`${parent.path}/${path}`)
}
