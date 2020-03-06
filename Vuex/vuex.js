class Store {
    constructor(options) {
        this.state = new Vue({
            data:options.state
        })
        this.mutations = options.mutations
        this.actions = options.actions

        options.getter && this.handleGetters(options.getter)
    }
    commit = (type,arg) => {
        this.mutations[type](this.state,arg)
    }
    dispatch(type,arg) {
        this.actions[type]({
            commit: this.commit,
            state:this.state
        },arg)
    }
    handleGetters(getter) {
        this.getters = {}
        // 遍历getters所有key
        Object.keys(getters).forEach(key => {
            // 为this.getters定义若干属性，这些属性是只读的
            Object.defineProperty(this.getters, key, {
                get: () => {
                    return getters[key](this.state)
                }
            })
        })
    }
}
function install(_vue) {
    Vue = _vue
    Vue.mixin({
        beforeCreate () {
            if(this.$options.store){
                Vue.prototype.$store = this.$options.store
            }            
        }
    })
}

export default { Store ,install }