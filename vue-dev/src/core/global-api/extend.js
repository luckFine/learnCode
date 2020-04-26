/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { defineComputed, proxy } from '../instance/state'
import { extend, mergeOptions, validateComponentName } from '../util/index'

// Vue.extend 的功能就是进行 原型继承
export function initExtend (Vue: GlobalAPI) {
  // 每个实例构造函数（包括vue）都有一个唯一的cid，用来创建和缓存继承的子类
  Vue.cid = 0
  let cid = 1

  /**
   * Class inheritance
   */
  // 传入一个对象  返回一个函数
  Vue.extend = function (extendOptions: Object): Function {
    extendOptions = extendOptions || {}
    const Super = this  // 大Vue
    const SuperId = Super.cid  // vue的cid
    // 做一次缓存，也就是单例模式
    const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    const name = extendOptions.name || Super.options.name
    if (process.env.NODE_ENV !== 'production' && name) {
      // 对组件名称name做校验
      validateComponentName(name)
    }

    const Sub = function VueComponent (options) {
      this._init(options)
    }
    // 原型继承 让VueComponent继承vue  让Sub拥有跟vue 一样的能力
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub
    Sub.cid = cid++
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    )
    // 给 Sub 子类添加 super 属性，与后面init相关
    Sub['super'] = Super

    // 对于props和computed属性，我们在扩展原型的扩展时在Vue实例上定义代理getter。
    // 这样可以避免对创建的每个实例调用Object.defineProperty
    if (Sub.options.props) {
      initProps(Sub)
    }
    if (Sub.options.computed) {
      initComputed(Sub)
    }

    // 允许进一步扩展/混合/插件使用
    Sub.extend = Super.extend
    Sub.mixin = Super.mixin
    Sub.use = Super.use

    // 给子类下面也添加上 'component','directive','filter'
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type]
    })
    // enable recursive self-lookup
    // 如果有name 属性  可以递归
    if (name) {
      Sub.options.components[name] = Sub
    }

    // 在扩展时保留对vue的引用
    // 稍后在实例化时，我们可以检查Super的选项是否更新
    Sub.superOptions = Super.options
    Sub.extendOptions = extendOptions
    Sub.sealedOptions = extend({}, Sub.options)

    // 缓存构造函数
    cachedCtors[SuperId] = Sub
    return Sub
  }
}

function initProps (Comp) {
  const props = Comp.options.props
  for (const key in props) {
    proxy(Comp.prototype, `_props`, key)
  }
}

function initComputed (Comp) {
  const computed = Comp.options.computed
  for (const key in computed) {
    defineComputed(Comp.prototype, key, computed[key])
  }
}
