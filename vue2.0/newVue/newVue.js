
class NewVue {
    constructor(options) {
        this.$options = options
        this.$data = options.data
        this.$el = options.el
        if (this.$el) {
            new Observe(this.$data)
            new Compile(options.el, this)
            this.proxyData(this.$data)
        }
    }
    proxyData(data) {
        for (const key in data) {
            Object.defineProperty(this, key, {
                get() {
                    return data[key]
                },
                set(newVal) {
                    data[key] = newVal
                }
            })
        }
    }
}
