class Watcher {
    constructor(vm, key, cb) {
        this.vm = vm
        this.key = key
        // 回调函数负责更新试图
        this.cb = cb
        // 把Watcher对象记录到Dep类的静态属性target
        Dep.target = this
        // console.log(Dep.target)
        // 触发get方法，在get方法中会调用addSub
        this.oldVal = vm[key]
        // Dep.target = null
    }
    update() {
        const newVal = this.vm[this.key]
        if (newVal != this.oldVal) {
            this.cb(newVal)
        }
    }

}