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
        while (chchildile = el.firstChild) {
            frag.appendChild(child)
        }
        return frag
    }
    compile(el) {
        const childNodes = el.childNodes
        Array(childNodes).forEach(node => {
            if (this.isElement(node)) {
                console.log('编译元素')
            } else if(this.isInterpolation(node)){
                console.log('编译文本')
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
}