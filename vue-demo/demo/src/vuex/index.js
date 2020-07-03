let Vue;
let forEach = (obj, callback) => {
    Object.keys(obj).forEach(key => {
        callback(key, obj[key])
    })
}
class ModuleCollection {
    constructor(options) {
        // 深度遍历，将所有的子模块都遍历一遍
        this.register([],options)
    }
    register(path,rootModule) {
        let rawModule = {
            _raw: rootModule,
            state: rootModule.state,
            _children: {}
        }
        // 格式化根
        if (!this.root) {
            this.root = rawModule
        } else {
            path.slice(0, -1).reduce((root, current) => {
                return root._children[current]
            },this.root)
            this.root._children[path[path.length-1]] = rawModule
        }
        // 格式化子
        if (rootModule.modules) {
            forEach(rootModule.modules, (moduleName, module) => {
                // 将a模块进行注册[a],a模块的定义
                // 将b模块进行注册[b],b模块的定义
                // 将c模块进行注册[b,c],c模块的定义
                this.register(path.concat(moduleName),module)
            })
        }
    }
}


class Store {
    constructor(options) {
        // 获取new实例时穿丝的所有属性
        console.log(options.state)
        this.vm = new Vue({
            data: {
                state: options.state
            }
        })
        this.getters = {}
        this.mutations = {}
        this.actions = {}
        // 需要将用户传入的数据进行格式化操作
        let root = {
            _raw: rootModule,
            state: rootModule.state,
            _children: {
                a: {
                    _raw: rootModule,
                    state: aModule.state,
                    _children:{}
                },
                b: {
                    _raw: rootModule,
                    state: bModule.state,
                    _children: {
                        c: {
                            _raw: rootModule,
                            state: cModule.state,
                            _children: {}
                        }
                    }
                }
            }
        }
        this.modules = new ModuleCollection(options)

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
        beforeCreate() {
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