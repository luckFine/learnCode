class Dep {
    constructor() {
        // 存储所有的依赖
        this.subs = []
    }
    // 添加观察者
    addSub(sub) {
        if (sub && sub.update) {
            this.subs.push(sub)
        }
    }
    // 发送通知
    notify() {
        this.subs.forEach(sub => {
            console.log(sub)
            sub.update()
        })
    }
}