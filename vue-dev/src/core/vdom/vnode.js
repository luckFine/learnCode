/* @flow */

export default class VNode {
  tag: string | void; 
  data: VNodeData | void;
  children: ?Array<VNode>;
  text: string | void;
  elm: Node | void;
  ns: string | void;
  context: Component | void; // rendered in this component's scope
  key: string | number | void;
  componentOptions: VNodeComponentOptions | void;
  componentInstance: Component | void; // component instance
  parent: VNode | void; // component placeholder node

  // strictly internal
  raw: boolean; // contains raw HTML? (server only)
  isStatic: boolean; // hoisted static node
  isRootInsert: boolean; // necessary for enter transition check
  isComment: boolean; // empty comment placeholder?
  isCloned: boolean; // is a cloned node?
  isOnce: boolean; // is a v-once node?
  asyncFactory: Function | void; // async component factory function
  asyncMeta: Object | void;
  isAsyncPlaceholder: boolean;
  ssrContext: Object | void;
  fnContext: Component | void; // real context vm for functional nodes
  fnOptions: ?ComponentOptions; // for SSR caching
  devtoolsMeta: ?Object; // used to store functional render context for devtools
  fnScopeId: ?string; // functional scope id support

  constructor (
    tag?: string,
    data?: VNodeData,  
    children?: ?Array<VNode>, 
    text?: string, 
    elm?: Node, 
    context?: Component, 
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {
    // 如果是生成组件的话，children，text，都是空，组件相关参数都在componentOptions中
     // 标签名
    this.tag = tag
    // 属性值 
    this.data = data
    // 子节点
    this.children = children
    // 文本节点
    this.text = text
    // 该vnode实例对应的真实dom节点
    this.elm = elm
    // 节点的 namespace
    this.ns = undefined
    // vnode 对应的 上下文环境，多数为 vm
    this.context = context
    // 组件函数中会用到的
    this.fnContext = undefined
    this.fnOptions = undefined
    this.fnScopeId = undefined
    // v-for 绑定的key
    this.key = data && data.key
    // 组件vnode 的 options
    this.componentOptions = componentOptions
    // 组件实例
    this.componentInstance = undefined
    this.parent = undefined
    // 是否为平台标签或文本
    this.raw = false
    // 静态节点
    this.isStatic = false
    // 是否是根节点
    this.isRootInsert = true
    // 是否是注释节点
    this.isComment = false
    // 是否是克隆节点
    this.isCloned = false
    // 是否是v-once节点
    this.isOnce = false
    this.asyncFactory = asyncFactory
    this.asyncMeta = undefined
    this.isAsyncPlaceholder = false
  }

  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  get child (): Component | void {
    return this.componentInstance
  }
}
// 生成空的注释节点
export const createEmptyVNode = (text: string = '') => {
  const node = new VNode()
  node.text = text
  node.isComment = true
  return node
}
// 生成文本节点
export function createTextVNode (val: string | number) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// 用于静态节点和时隙节点，因为它们可以在多个渲染中重用，克隆它们可以避免当DOM操作依赖于它们的elm引用时出现错误
// 克隆节点
export function cloneVNode (vnode: VNode): VNode {
  const cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  )
  cloned.ns = vnode.ns
  cloned.isStatic = vnode.isStatic
  cloned.key = vnode.key
  cloned.isComment = vnode.isComment
  cloned.fnContext = vnode.fnContext
  cloned.fnOptions = vnode.fnOptions
  cloned.fnScopeId = vnode.fnScopeId
  cloned.asyncMeta = vnode.asyncMeta
  cloned.isCloned = true // 克隆节点的标记
  return cloned
}
