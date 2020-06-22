import View from './components/view'
import Link from './components/link'

export let _Vue

// 当我们调用vue.use(plugin)的时候，会默认调用plugin.install() 传入的第一个参数就是vue

export function install(Vue) {
  // 如果已经install过 那么直接返回 不会多次注册
  if (install.installed && _Vue === Vue) return

  install.installed = true

  _Vue = Vue

  const isDef = v => v !== undefined

  const registerInstance = (vm, callVal) => {
    let i = vm.$options._parentVnode
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal)
    }
  }

  // 用Vue.mixin混入路由的钩子函数，所以每个组件都有beforeCreate和destroyed函数
  Vue.mixin({
    beforeCreate() {
      // this.$options.router就是实例化vue的时候router的配置信息
      if (isDef(this.$options.router)) {
        // 当前的vue实例就是_routerRoot
        this._routerRoot = this
        // 传入的router实例
        this._router = this.$options.router
        // 执行router的init函数
        this._router.init(this)
        // _route设置成响应对象
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        // 在每一个组件都可以访问到根实例
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
      registerInstance(this, this)
    },
    destroyed () {
      registerInstance(this)
    }
  })
// 在vue的原型上定义$router和$route
  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })
  // 全局注册RouterView和RouterLink组件
  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)

  const strats = Vue.config.optionMergeStrategies
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created
}
