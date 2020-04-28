import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'
// 真正的vue构造函数
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    // vue必须通过new进行实例化
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // new Vue() 只调用了 _init() 方法  _init在initMixin()中定义的
  this._init(options)
}
// 定义一些mixin方法，将不同的方法添加到不同的文件下 添加到vue的原型上
initMixin(Vue)
stateMixin(Vue) // 状态混入  圆形方法 ***
eventsMixin(Vue) //  事件相关  原型方法 ***
lifecycleMixin(Vue) // 生命周期  ***
renderMixin(Vue) // 


// 初始化总结 
// 当执行new vue()的时候，会执行_init()方法，_init()方法会执行一堆初始化的操作，合并option，执行一堆init方法，执行proxy做数据代理
// 执行$mount
export default Vue
