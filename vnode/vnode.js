
const vnodeType = {
    HTML: "HTML",
    TEXT: "TEXT",
    COMPONENT: 'COMPONENT',
    CLASS_COMPONENT:'CLASS_COMPONENT'
}

const chilType = {
    EMPTY: 'EMPTY',
    SINGLE: 'SINGLE',
    MULTIPLE:'MULTIPLE'
}



function createElement(tag, data, children) {
    let flag
    // 字符串表示是个标签
    if (typeof tag == 'string') {
        flag = vnodeType.HTML
        // 如果是函数的话表示是个组件
    } else if(typeof tag == 'function'){
        flag = vnodeType.COMPONENT
    } else {
        flag = vnodeType.TEXT
    }
    let childrenFlag

    if (children == null) {
        childrenFlag = chilType.EMPTY
    } else if (Array.isArray(children)) {
        let length = children.length
        if (length == 0) {
            childrenFlag = chilType.EMPTY
        } else {
            childrenFlag = chilType.MULTIPLE
        }
        
    } else {
        // 其他情况认为是文本
        childrenFlag = chilType.SINGLE
        children = createTextVnode(children+"")
    }
    return {
        flag, // vnode的类型
        tag,
        data,
        children,
        childrenFlag,
        el:null
    }
}

function render(vnode,container) {
    // 更新
    if (container.vnode) {
        patch(container.vnode, vnode, container)
    } else {
    // 首次渲染
        mount(vnode, container)
    }
   
    container.vnode = vnode
}

function patch(prev,next,container) {
    let nextFlag = next.flag
    let prevFlag = prev.flag
    if (nextFlag !== prevFlag) {
        replaceVnode(prev, next, container)
    } else if (nextFlag == vnodeType.HTML) {
        patchElement(prev, next, container)
    } else if (nextFlag == vnodeType.TEXT) {
        patchText(prev, next)
    }
}

function patchElement(prev, next, container) {
    if (prev.tag !== next.tag) {
        replaceVnode(prev, next, container)
        return 
    }
    let el = (next.el = prev.el)
    let prevData = prev.data
    let nextData = next.data
    if (nextData) {
        for (let key in nextData) {
            let prevVal = prevData[key]
            let nextVal = nextData[key]
            patchData(el, key, prevVal, nextVal)
        }
    }
    if (prevData) {
        for (let key in prevData) {
            let prevVal = prevData[key]
            if (prevVal && !nextData.hasOwnProperty(key)) {
                patchData(el, key, prevVal, null)                
            }
        }
    }
    // data更新完毕  更新子元素
    patchChildren(prev.childrenFlag,next.childrenFlag,prev.children,next.children,el)
}

function patchChildren(prevChildrenFlag, nextChildrenFlag, prevChildren, nextChildren, container) {
    // 更新子元素
    // 1、老的是单独的 老的是空的  老的是多个
    // 2、新的是单独的 新的是空的  新的是多个
    switch (prevChildrenFlag) {
        case chilType.SINGLE:
            switch (nextChildrenFlag) {
                case chilType.SINGLE:
                    patch(prevChildren, nextChildren, container)
                    break
                case chilType.EMPTY:
                    container.removeChild(prevChildren.el)
                    break
                case chilType.MULTIPLE:
                    container.removeChild(prevChildren.el)
                    for (let i = 0; i < nextChildren.length; i++){
                        mount(nextChildren[i],container)
                    }
                    break
            }
            break
        case chilType.EMPTY:
            switch (nextChildrenFlag) {
                case chilType.SINGLE:
                    mount(nextChildren,container)
                    break
                case chilType.EMPTY:
                    break
                case chilType.MULTIPLE:
                    for (let i = 0; i < nextChildren.length; i++) {
                        mount(nextChildren[i], container)
                    }
                    break
            }
            break
        case chilType.MULTIPLE:
            switch (nextChildrenFlag) {
                case chilType.SINGLE:
                    for (let i = 0; i < prevChildren.length; i++) {
                        container.removeChild(prevChildren[i].el)
                    }
                    mount(nextChildren,container)
                    break
                case chilType.EMPTY:
                    for (let i = 0; i < prevChildren.length; i++) {
                        container.removeChild(prevChildren[i].el)
                    }
                    break
                case chilType.MULTIPLE:
                    // 众多虚拟dom，就在这里进行区分。每家优化策略不一样
                    // 老的是个数组  新的也是个数组
                    let lastIndex = 0;
                    let find = false
                    for (let i = 0; i < nextChildren.length; i++){
                        let nextVode = nextChildren[i]
                        let j = 0
                        for (j; j < prevChildren.length; j++){
                            let preVnode = nextChildren[i]

                            if (preVnode.key === nextVode.key) {
                                // key相同 认为是同一个元素
                                patch(preVnode, nextVode, container)
                                if (j < lastIndex){
                                    // 需要移动
                                    // insertBefore 移动元素
                                    let flagNode = nextChildren[i - 1].el.nextSibling
                                    container.insertBefore(preVnode.el, flagNode)
                                    break
                                } else {
                                    lastIndex = j
                                }                                
                            }
                            

                        }
                        if (!find) {
                            // 需要新增的
                            let  flagNode =  i == 0 ?prevChildren[0].el : nextChildren[i-1].el.nextSibling
                            mount(nextVode,container)
                        }

                    }
                    // 移除不需要的元素
                    for (let i = 0; i = prevChildren.length; i++){
                        const prevVnode = prevChildren[i]
                        const has = nextChildren.find(next => next.key == prevVnode.key)
                        if (!has) {
                            container.removeChild(prevVnode.el)
                        }
                    }
                    console.log('老的是个数组  新的也是个数组')
            }
            break
    }
}

function patchText() {
    let el = (next.el = prev.el)
    if (next.children !== prev.children) {
        el.nodeValue = next.children
    }
}

function replaceVnode(prev, next, container) {
    container.removeChild(prev.el)
    mount(next,container)
}



function mount(vnode, container,flagNode) {
    let { flag } = vnode
    if (flag == vnodeType.HTML) {
        mountElement(vnode, container, flagNode)
    } else if (flag == vnodeType.TEXT) {
        mountText(vnode, container)
    }
}

function mountElement(vnode, container, flagNode) {
    let dom = document.createElement(vnode.tag)
    vnode.el = dom
    // let data = vnode.data
    let { data, children, childrenFlag } = vnode
    // 挂载data属性
    if (data) {
        for (let key in data) {
            // 节点 key 以前属性值 现在属性值
            patchData(dom,key,null,data[key])
        }
    }

    if (childrenFlag !== chilType.EMPTY) {
        if (childrenFlag == chilType.SINGLE) {
            mount(children,dom)
        } else if (childrenFlag == chilType.MULTIPLE) {
            for (let i = 0; i < children.length; i++){
                mount(children[i],dom)
            }
        } 
    } 
    flagNode? container.insertBefore(dom,flagNode) :container.appendChild(dom)
}

function mountText(vnode, container) {
    let dom = document.createTextNode(vnode.children)
    vnode.el = dom
    container.appendChild(dom)
}

function patchData(el, key, prev, next) {
    switch (key) {
        case 'style':
            for (let k in next) {
                el.style[k] = next[k]
            }
            for (let k in prev) {
                if (!next.hasOwnProperty(k)) {
                    el.style[k] = ''               
                }
            }

            break
        case 'class':
            el.className = next
            break
        default:
            if (key[0] === '@') {
                if (prev) {
                    el.removeListener(key.slice(1), prev)
                }
                if (next) {
                    el.addEventListener(key.slice(1),next)
                }
            } else {
                el && el.setAttribute(key,next)
            }
    }
}


function createTextVnode(text) {
    return {
        flag: vnodeType.TEXT,
        tag: null,
        children: text,
        childrenFlag:chilType.EMPTY
    }
}