
class NewVue {
    constructor(options){
        this.$options = options
        this.$data = options.data
        this.observe(this.$data)
        new Compile(options.el,this)
    }
    observe(value){
        if(!value || typeof value !== "object"){
            return 
        }
        Object.keys(value).forEach( key => {
            this.defineReactive(value,key,value[key])
        })
    }
    defineReactive(obj, key, value){
        this.observe(value)
        const dep = new Dep()
        Object.defineProperty(obj,key,{
            get(){
                Dep.target && dep.addDep(Dep.target)
                return value
            },
            set(newVal){
                if(newVal === value){
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
    constructor(){
        this.deps = []
    }
    addDep(dep){
        this.deps.push(dep)
    }
    notify(){
        this.deps.forEach(dep => dep.update())
    }
}

class Watcher {
    constructor(){
        Dep.target = this
    }
    update(){
        console.log('属性更新了')
    }
}

