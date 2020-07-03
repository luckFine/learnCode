let Vue;
let forEach = (obj, callback) => {
    Object.keys(obj).forEach(key => {
        callback(key,obj[key])
    })
}
// forEach({ a: 1, B: 2 }, (key, value) => {
//     console.log(key,value)
// })

class Store{
    constructor(options) {
        // 获取new实例时传递的所有属性
        console.log(options.state)
        this.vm = new Vue({
            data: {
                state:options.state
            }
        })
        let getters = options.getters
        this.getters = {}
        // Object.keys(getters).forEach(getterName => {
        //     Object.defineProperty(this.getters, getterName,{
        //         get: () => {
        //             return getters[getterName](this.state)
        //         }
        //     })
        // })
        forEach(getters, (getterName,value) => {
            Object.defineProperty(this.getters, getterName,{
                get: () => {
                    return value(this.state)
                }
            })
        })
        let mutations = options.mutations
        this.mutations = {}
        forEach(mutations, (mutationName, value) => {
            this.mutations[mutationName] = (payload) => {
                value(this.state,payload)
            }
        })
        let actions = options.actions
        this.actions = {}
        forEach(actions, (actionName, value) => {
            this.actions[actionName] = (payload) => {
                value(this, payload)
            }
        })
    }
    get state() { // 获取实例上的state属性 就会执行此方法
        return this.vm.state
    }
    commit = (mutationName, payload) => {
        // es7的写法，这个里面的this，永远指向当前的store的实例
        this.mutations[mutationName](payload)
    }
    dispatch = (actionName, payload) => {
        this.actions[actionName](payload)
    }
}

const install = (_Vue) => {
    Vue = _Vue  // vue的构造函数
    // 放到vue的原型上  不对 因为默认会给所有的实例增加 
    // 只有从当前的根实例开始  所有根实例的子组件才有 $store方法
    Vue.mixin({
        beforeCreate () {
            // console.log(this.$options.name)
            // 把父组件的store属性，放到每个组件的实例上
            if (this.$options.store) {
                this.$store = this.$options.store
            } else {
                this.$store = this.$parent && this.$parent.$store
            }
            console.log(this.$store)
        }
    })
}

export default {
    Store,
    install
}