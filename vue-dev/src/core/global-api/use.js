/* @flow */
// 把类数组转成正常的数组
import { toArray } from '../util/index' 

export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    // 防止重复添加
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this)
    // 所以插件的写法就是  如果有install，Vue.use()的时候 就执行它的install方法 没有install的话 就直接调用
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    // 把插件添加到插件数组中
    installedPlugins.push(plugin)
    return this
  }
}
