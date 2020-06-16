export default class VueRouter {

    constructor(options: RouterOptions = {}) {
        this.app = null
        this.apps = []
        this.options = options
        this.beforeHooks = []
        this.resolveHooks = []
        this.afterHooks = []
        // 调用createMatcher函数
        this.matcher = createMatcher(options.routes || [], this)
        // 获取路由定义的模式  history/hash
        let mode = options.mode || 'hash'
        // history模式下，并非所有的浏览器都支持  需要做supportsPushState校验  如果不支持 this.fallback = true
        this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false
        // 不支持history模式 降级到hash模式
        if (this.fallback) {
            mode = 'hash'
        }
        // 非浏览器环境下 才会有abstract
        if (!inBrowser) {
            mode = 'abstract'
        }
        this.mode = mode
        // 匹配mode，进行路由，进行对应模式下的实例化
        switch (mode) {
            case 'history':
                this.history = new HTML5History(this, options.base)
                break
            case 'hash':
                this.history = new HashHistory(this, options.base, this.fallback)
                break
            case 'abstract':
                this.history = new AbstractHistory(this, options.base)
                break
            default:
                if (process.env.NODE_ENV !== 'production') {
                    assert(false, `invalid mode: ${mode}`)
                }
        }
    }

    match(
        raw,
        current,
        redirectedFrom,
    ) {
        return this.matcher.match(raw, current, redirectedFrom)
    }

    get currentRoute(): ?Route {
        return this.history && this.history.current
    }

    init(app: any /* Vue component instance */) {
        // app就是组件实例
        // this.apps是VueRouter实例化时候定义的数组
        this.apps.push(app)

        // set up app destroyed handler
        // https://github.com/vuejs/vue-router/issues/2639
        app.$once('hook:destroyed', () => {
            // clean out app from this.apps array once destroyed
            const index = this.apps.indexOf(app)
            if (index > -1) this.apps.splice(index, 1)
            // ensure we still have a main app or null if no apps
            // we do not release the router so it can be reused
            if (this.app === app) this.app = this.apps[0] || null
        })

        // main app previously initialized
        // return as we don't need to set up new history listener
        // 确保逻辑只执行一次
        if (this.app) {
            return
        }
        // 并且把app赋值给this.app
        this.app = app
        //  this.history 为构造函数中根据mode匹配的HTML5History，或者HashHistory 或者AbstractHistory
        const history = this.history
        // HTML5History和HashHistory等其实都是继承于History
        // 判断mode 执行不同逻辑
        if (history instanceof HTML5History) {
            // 路径切换
            history.transitionTo(history.getCurrentLocation())
        } else if (history instanceof HashHistory) {
            // 定义了setupHashListener
            const setupHashListener = () => {
                history.setupListeners()
            }
            // 将setupHashListener传入到了transitionTo，并且执行transitionTo
            // transitionTo主要做一些路由过度 在src/history/base.js
            history.transitionTo(
                history.getCurrentLocation(),
                setupHashListener,
                setupHashListener
            )
        }

        history.listen(route => {
            this.apps.forEach((app) => {
                app._route = route
            })
        })
    }

    beforeEach(fn: Function): Function {
        return registerHook(this.beforeHooks, fn)
    }

    beforeResolve(fn: Function): Function {
        return registerHook(this.resolveHooks, fn)
    }

    afterEach(fn: Function): Function {
        return registerHook(this.afterHooks, fn)
    }

    onReady(cb: Function, errorCb?: Function) {
        this.history.onReady(cb, errorCb)
    }

    onError(errorCb: Function) {
        this.history.onError(errorCb)
    }

    push(location: RawLocation, onComplete?: Function, onAbort?: Function) {
        // $flow-disable-line
        if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
            return new Promise((resolve, reject) => {
                this.history.push(location, resolve, reject)
            })
        } else {
            this.history.push(location, onComplete, onAbort)
        }
    }

    replace(location: RawLocation, onComplete?: Function, onAbort?: Function) {
        // $flow-disable-line
        if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
            return new Promise((resolve, reject) => {
                this.history.replace(location, resolve, reject)
            })
        } else {
            this.history.replace(location, onComplete, onAbort)
        }
    }

    go(n: number) {
        this.history.go(n)
    }

    back() {
        this.go(-1)
    }

    forward() {
        this.go(1)
    }

    getMatchedComponents(to?: RawLocation | Route): Array<any> {
        const route: any = to
            ? to.matched
                ? to
                : this.resolve(to).route
            : this.currentRoute
        if (!route) {
            return []
        }
        return [].concat.apply([], route.matched.map(m => {
            return Object.keys(m.components).map(key => {
                return m.components[key]
            })
        }))
    }

    resolve(
        to: RawLocation,
        current?: Route,
        append?: boolean
    ){
        current = current || this.history.current
        const location = normalizeLocation(
            to,
            current,
            append,
            this
        )
        const route = this.match(location, current)
        const fullPath = route.redirectedFrom || route.fullPath
        const base = this.history.base
        const href = createHref(base, fullPath, this.mode)
        return {
            location,
            route,
            href,
            // for backwards compat
            normalizedTo: location,
            resolved: route
        }
    }

    addRoutes(routes: Array<RouteConfig>) {
        this.matcher.addRoutes(routes)
        if (this.history.current !== START) {
            this.history.transitionTo(this.history.getCurrentLocation())
        }
    }
}

function registerHook(list: Array<any>, fn: Function): Function {
    list.push(fn)
    return () => {
        const i = list.indexOf(fn)
        if (i > -1) list.splice(i, 1)
    }
}

function createHref(base: string, fullPath: string, mode) {
    var path = mode === 'hash' ? '#' + fullPath : fullPath
    return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install
VueRouter.version = '__VERSION__'

if (inBrowser && window.Vue) {
    window.Vue