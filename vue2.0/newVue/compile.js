const compileUtil = {
    getval(expr, vm) {
        // person.name 
        return expr.split('.').reduce((data, currentVal) => {
            return data[currentVal]
        }, vm.$data)
    },
    setVal(expr, vm, inputVal) {
        return expr.split('.').reduce((data, currentVal) => {
            data[currentVal] = inputVal
        }, vm.$data)
    },
    getContentVal(expr, vm) {
        return expr.replace(/\{\{(.*)\}\}/g, (...args) => {
            return this.getval(args[1], vm)
        })
    },
    text(node, expr, vm) {
        let value
        //expr:msg
        //  找到对应的在data里设置的属性值 person.name
        if (expr.indexOf('{{') != -1) {
            // {{a}}  {{a.b}}
            // 绑定观察者，将来数据发生变化，触发这里回调，进行更新
            value = expr.replace(/\{\{(.*)\}\}/g, (...args) => {
                new Watcher(vm, args[1], () => {
                    this.updter.textUpdater(node, this.getContentVal(expr, vm))
                })
                return this.getval(args[1], vm)
            })
        } else {
            value = this.getval(expr, vm)
        }
        this.updter.textUpdater(node, value) // 进行属性更新 
    },
    html(node, expr, vm) {
        const value = this.getval(expr, vm)
        new Watcher(vm, expr, (newval) => {
            this.updter.htmlUpdater(node, newval)
        })
        this.updter.htmlUpdater(node, value)
    },
    model(node, expr, vm) {
        const value = this.getval(expr, vm)
        // 绑定更新函数  数据=》视图
        new Watcher(vm, expr, (newval) => {
            this.updter.modelUpdater(node, newval)
        })
        // 视图=》数据=》视图
        node.addEventListener('input', (e) => {
            // 设置值
            this.setVal(expr, vm, e.target.value)
        })
        this.updter.modelUpdater(node, value)
    },
    on(node, expr, vm, eventName) {
        // 事件
        let fn = vm.$options.methods && vm.$options.methods[expr]
        node.addEventListener(eventName, fn.bind(vm), false)
    },
    bind(node, expr, vm, eventName) {
        // 自己实现
    },
    updter: {
        textUpdater(node, value) {
            node.textContent = value
        },
        htmlUpdater(node, value) {
            node.innerHTML = value
        },
        modelUpdater(node, value) {
            node.value = value
        }
    }
}


class Compile {
    constructor(el, vm) {
        this.$el = document.querySelector(el)
        this.$vm = vm

        if (this.$el) {
            this.$fragment = this.node2Fragment(this.$el)
            this.compile(this.$fragment)
            // 将编译玩的html结果追加值￥el
            this.$el.appendChild(this.$fragment)
        }
    }
    node2Fragment(el) {
        const frag = document.createDocumentFragment()
        let child;
        while (child = el.firstChild) {
            frag.appendChild(child)
        }
        return frag
    }
    compile(el) {
        const childNodes = el.childNodes;
        [...childNodes].forEach(node => {
            if (this.isElement(node)) {
                // console.log('编译元素')
                this.compileElement(node)
            } else if (this.isInterpolation(node)) {
                // console.log('编译文本')
                this.compileText(node)
            }

            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
    }
    isElement(node) {
        return node.nodeType === 1
    }
    isInterpolation(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
    }
    compileElement(node) {
        const attributes = node.attributes;
        [...attributes].forEach(attr => {
            // 自定义指令和原生属性
            const { name, value } = attr
            // 判断是否为自定义指令 v-test..
            if (this.isDirective(name)) {
                const [, dirctive] = name.split('-') // text  html model on:click
                const [dirName, eventName] = dirctive.split(':')  // text  html model on
                // 更新数据，数据驱动试图
                compileUtil[dirName](node, value, this.$vm, eventName)
                // console.log(dirName, eventName)
                // 删除有指令的标签上的属性
                node.removeAttribute('v-' + dirctive)
            } else if (this.isEventName(name)) { // @click=''
                const [, eventName] = name.split('@')
                compileUtil['on'](node, value, this.$vm, eventName)
            } else if ('bind开头') {

            }
        });
    }
    compileText(node) {
        // 处理双大括号上的文本
        const content = node.textContent
        if (/\{\{(.*)\}\}/.test(content)) {
            compileUtil['text'](node, content, this.$vm)
        }
    }
    isDirective(attrname) {
        return attrname.startsWith('v-')
    }
    isEventName(arrtname) {
        return arrtname.startsWith('@')
    }
}

