import Vue from 'vue'
class VueRouter {
    constructor(options) {
        this.$options = options;
        this.routeMap = {}  // routeMap初始化
        // 路由响应式 跟vue为强绑定 只能用于vue
        this.app = new Vue({
            data: {
                current:'/'
            }
        })
    }
    init() {
        this.bindEvents() // 监听url变化
        this.createRoteMap(this.$options) // 解析路由配置
        this.initCompontent() // 实现两个组件
    }
    bindEvents() {
        window.addEventListener('load', this.onHasHChange.bind(this));
        window.addEventListener('hashchange', this.onHasHChange.bind(this));
    }
    onHasHChange() {
        this.app.current = window.location.hash.slice(1) || '/'
    }
    createRoteMap(options) {
        // 将路由和组件一一对应
        options.router.forEach(item => {
            this.routeMap[item.path] = item.component
        });
    }
    initCompontent() {
        // router-link router-view
        Vue.component('router-link', {
            props: { to: String },
            // createElement === h
            render(h, context) {
                // h(tag,data.children)
                return h('a', { attrs:{href:'#'+this.to}},[this.$slots.default])
            }
        })

        Vue.component('router-view', {
            props: { to: String },
            // createElement === h
            render:(h, context) => {
                const comp = this.routeMap[this.app.current]
                return h(comp)
            }
        })
    }
}
 
VueRouter.install = function (Vue) {
    Vue.mixin({
        beforeCreate() {
            // this是vue的实例
            if (this.$options.router) {
                // 仅在根组件执行一次
                Vue.prototype.$router = this.$options.router
                this.$options.router.init()
            }
        }
    })
}

Vue.use(VueRouter)