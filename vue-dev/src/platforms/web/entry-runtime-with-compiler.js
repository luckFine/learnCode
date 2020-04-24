/* @flow */

import config from 'core/config'
import { warn, cached } from 'core/util/index'
import { mark, measure } from 'core/util/perf'
// 虽然entry-runtime-with-compiler.js导出了一个Vue 但是Vue是从‘./runtime/index’引入的  跳转到./runtime/index找真实的入口文件
import Vue from './runtime/index'
import { query } from './util/index'
import { compileToFunctions } from './compiler/index'
import { shouldDecodeNewlines, shouldDecodeNewlinesForHref } from './util/compat'

const idToTemplate = cached(id => {
  const el = query(id)
  return el && el.innerHTML
})
// 给Vue扩展$mount
// 接受一个字符串或者元素。如果是字符串 调用document.querySelector 如果是dom对象，直接return
const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el)
  // entry-runtime-with-compiler版本的mount
  // el不可以是body或者document
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    )
    return this
  }
  // 获得传入的选项
  const options = this.$options
  // 判断是否定义了render
  // 如果没有执行就需要编译生成render函数
  if (!options.render) {
    // 判断是否有template 
    let template = options.template
    // 如果定义了template 解析template
    if (template) {
      // template为字符串
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              `Template element not found or is empty: ${options.template}`,
              this
            )
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this)
        }
        return this
      }
    } else if (el) {
      // 没有定义template，解析el
      template = getOuterHTML(el)
    }
    // template为绑定元素及其子元素
    if (template) {
      // 得到render函数
      const { render, staticRenderFns } = compileToFunctions(template, {
        outputSourceRange: process.env.NODE_ENV !== 'production',
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      // 将render函数赋值给options.render
      options.render = render
      options.staticRenderFns = staticRenderFns
    }
  }
  // 如果定义了render函数，那么直接执行$mount
  return mount.call(this, el, hydrating)
}

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el: Element): string {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    const container = document.createElement('div')
    container.appendChild(el.cloneNode(true))
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions

export default Vue
