class Observe {
    constructor(data) {
        this.observe(data)
    }
    observe(data) {
        if (!data || typeof data !== "object") {
            return
        }
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        })
    }
    defineReactive(obj, key, value) {
        this.observe(value) // 递归处理
        const dep = new Dep()
        // 劫持并监听所有的属性
        Object.defineProperty(obj, key, {
            get() {
                // 订阅数据变化时，在dep中收集依赖
                Dep.target && dep.addDep(Dep.target)
                return value
            },
            set: (newVal) => {
                this.observe(newVal) // 防止将其赋值给一个新对象，新对象里属性变化不能被监听到
                if (newVal === value) {
                    return
                }

                value = newVal
                // console.log(`属性更新了，${key}:${value}`)
                dep.notify()
            }
        })
    }
}
class Dep {
    constructor() {
        this.deps = []
    }
    addDep(dep) {
        this.deps.push(dep)
    }
    notify() {
        console.log(this.deps)
        this.deps.forEach(dep => dep.update())
    }
}

class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm
        this.expr = expr
        this.cb = cb
        // 先把旧值保存起来
        this.oldVal = this.getOldVal()
    }
    getOldVal() {
        Dep.target = this
        const oldVal = compileUtil.getval(this.expr, this.vm)
        Dep.target = null
        return oldVal
    }
    update() {
        const newVal = compileUtil.getval(this.expr, this.vm)
        console.log('属性更新了')
        if (newVal != this.oldVal) {
            this.cb(newVal)
        }
    }
}

