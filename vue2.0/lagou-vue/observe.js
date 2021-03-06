class Observer {
    constructor(data) {
        this.walk(data)
    }
    walk(data) {
        // 1、判断data是否是对象
        if (!data || typeof data !== 'object') {
            return
        }
        // 2、遍历data对象属性
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        })
    }
    defineReactive(obj, key, val) {
        this.walk() // 深度响应式
        // 负责收集依赖并发送通知
        let dep = new Dep()
        let self = this
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                // 收集依赖
                // console.log(Dep.target)
                Dep.target && dep.addSub(Dep.target)
                return val
            },
            set(newVal) {
                if (val === newVal) {
                    return
                }
                val = newVal
                // 赋值给一个新的对象，将新对象也设置成响应式
                self.walk(newVal)
                //发送通知
                // console.log(dep)
                dep.notify()
                // 发送通知
            }
        })
    }
}