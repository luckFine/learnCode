class Vue {
    constructor(options) {
        // 1、通过属性保存选项的数据
        this.$options = options || {}
        this.$data = options.data || {}
        this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
        // 2、把data中的长远转成getter和setter，注入到vue实例中
        this._proxydata(this.$data)
        // 3、调用observer对象，监听数据的变化
        new Observer(this.$data)
        // 4、调用compiler对象，解析指令和差值表达式
        new Compiler(this)
    }
    _proxydata(data) {
        // 遍历data中的所有属性
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                get() {
                    return data[key]
                },
                set(newVal) {
                    if (data[key] === newVal) {
                        return
                    }
                    data[key] = newVal
                }
            })
        })
        // 把data的属性注入到vue实例中
    }
}