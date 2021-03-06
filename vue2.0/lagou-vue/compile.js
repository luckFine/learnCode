class Compiler {
    constructor(vm) {
        this.el = vm.$el
        this.vm = vm
        this.compile(this.el)
        // console.log(this.vm)
    }
    // 编译模板，处理文本和元素节点
    compile(el) {
        const childNodes = el.childNodes; // 遍历所有节点
        [...childNodes].forEach(node => {
            if (this.isElementNode(node)) {
                // console.log('编译元素')
                this.compileElement(node)
            } else if (this.isInterpolation(node)) {
                // console.log('编译文本')
                this.compileText(node)
            }
            // 判断node节点，是否有子节点，如果有子节点，要递归调用compile
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
    }
    // 编译元素节点，处理指令
    compileElement(node) {
        const attributes = node.attributes;
        [...attributes].forEach(attr => {
            // 自定义指令和原生属性
            // const { name, value } = attr
            // // 判断是否为自定义指令 v-test..
            // if (this.isDirective(name)) {
            //     const [, dirctive] = name.split('-') // text  html model on:click
            //     const [dirName, eventName] = dirctive.split(':')  // text  html model on
            //     // 更新数据，数据驱动试图
            //     compileUtil[dirName](node, value, this.$vm, eventName)
            //     // console.log(dirName, eventName)
            //     // 删除有指令的标签上的属性
            //     node.removeAttribute('v-' + dirctive)
            // } else if (this.isEventName(name)) { // @click=''
            //     const [, eventName] = name.split('@')
            //     compileUtil['on'](node, value, this.$vm, eventName)
            // } else if ('bind开头') {
            // }
            let attrName = attr.name
            if (this.isDirective(attrName)) {
                attrName = attrName.substr(2)
                let key = attr.value
                // let value = this.vm[key]
                // console.log(attrName, this.vm)
                this.update(node, key, attrName)
            }
        });
    }
    update(node, key, attrName) {
        let updateFn = this[attrName + 'Updater']
        // console.log(updateFn)
        // updateFn && this[attrName + 'Updater'](node, this.vm[key], key)
        updateFn && updateFn.call(this, node, this.vm[key], key)
    }
    // 处理v-text
    textUpdater(node, value, key) {
        node.textContent = value
        // console.log(this)
        new Watcher(this.vm, key, (value) => {
            node.textContent = value
        })
    }
    // 处理v-module
    modelUpdater(node, value, key) {
        node.value = value
        new Watcher(this.vm, key, (value) => {
            node.value = value
        })
        console.log(node.value)
        // 双向绑定 
        node.addEventListener('input', () => {
            this.vm[key] = node.value

        })
    }
    // 编译文本节点，处理差值表达式
    compileText(node) {
        // 处理双大括号上的文本
        // const content = node.textContent
        // if (/\{\{(.*)\}\}/.test(content)) {
        //     compileUtil['text'](node, content, this.$vm)
        // }
        let reg = /\{\{(.+?)\}\}/
        let value = node.textContent
        if (reg.test(value)) {
            let key = RegExp.$1.trim()
            node.textContent = value.replace(reg, this.vm[key])
            // 创建watcher对象，当数据改变时候更新试图
            // console.log(key)
            new Watcher(this.vm, key, (newValue) => {
                // console.log(key)
                node.textContent = newValue
            })
        }
    }
    // 判断元素属性是否是指令
    isDirective(attrname) {
        return attrname.startsWith('v-')
    }
    // 判断节点是否是文本节点
    isTextNode() {
        return node.nodeType === 3
    }
    // 判断节点是否是元素节点
    isElementNode(node) {
        return node.nodeType === 1
    }
    isInterpolation(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
    }
}