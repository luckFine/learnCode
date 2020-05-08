/* @flow */

import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'
import { observe } from 'core/observer/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'


// 导出了initGlobalAPI方法
export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  // 在Vue上定义了一个config属性，属性值为configDef  configDef的来源为config   config定义在../config
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods. 
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  // 定义了一个util方法，但是这个不是公共API的一部分  尽量不要用
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }
  // 给vue定义set  delete  nextTick
  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  // 2.6 explicit observable API
  // 添加把 对象变为 observable 的方法
  Vue.observable = (obj: T): T => {
    observe(obj)
    return obj
  }
  // 在Vue.options 添加 'component','directive',
  // 'filter' + ’s’ 的形式，并且设置为一个空对象
  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  // 在weex中用的 暂不讨论
  Vue.options._base = Vue

  // 在vue上扩展了一个builtInComponents   builtInComponents 实际上keep-alive， 也就是说keep-alive实际上是内置组件
  extend(Vue.options.components, builtInComponents)

  initUse(Vue)  // 创建了use方法
  initMixin(Vue)  // 定义了mixin
  initExtend(Vue) // 定义了extend
  initAssetRegisters(Vue)  // 定义其他的全局方法
}
