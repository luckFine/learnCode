let _Vue = null
// vue的构建版本
// 运行时版本：不支持template模板，需要打包的时候提前编译
// 完整版：包含运行时和编译器，体积比运行时大10k左右，程序运行时
// 把模板转换成render函数

// 模拟router的history模式
export default class VueRouter {
    static install(Vue) {
        // 1、判断当前插件是否已经被安装
        if (VueRouter.install.installed) {
            return
        }
        VueRouter.install.installed = true
        // 2、把Vue构造函数记录到全局变量
        _Vue = Vue
        // 3、把创建Vue实例时候传入的router对象注入到Vue实例上
        // 混入
        _Vue.mixin({
            brforeCreate() {
                if (this.$options.router) {
                    _Vue.prototype.$router = this.$options.router
                    this.$options.router.init()
                }
            }
        })
    }
    constructor(options) {
        this.options = options
        this.routerMap = {}
        // 记录当前路由，默认为/
        this.data = _Vue.observable({
            current: '/'
        })
    }
    init() {
        this.createRouteMap()
        this.initComponents(_Vue)
        this.initEvent()
    }
    createRouteMap() {
        // 遍历所有的路由规则，把路由规则解析成键值对的形式，存储到routerMap中
        this.options.routers.forEach(route => {
            this.routerMap[route.path] = route.component
        })
    }
    initComponents(Vue) {
        Vue.component('router-link', {
            props: {
                to: String
            },
            render(h) {
                return h('a', {
                    attrs: {
                        href: this.to
                    },
                    on: {
                        click: this.clickHandler
                    }
                }, [this.$slot.default])
            },
            methods: {
                clickHandler(e) {
                    history.pushState({}, '', this.to)
                    this.$router.data.current = this.to
                    e.preventDefault()
                }
            }
            // template: '<a :href="to"> <slot></slot> </a>'
        })
        const self = this
        Vue.component('router-view', {
            render(h) {
                const component = self.routerMap[self.data.current]
                return h(component)
            }
            // template: '<a :href="to"> <slot></slot> </a>'
        })
    }
    initEvent() {
        window.addEventListener('popstate', () => {
            this.data.current = window.location.pathname
        })
    }
}