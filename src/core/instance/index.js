import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// Vue构造函数
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }

  // 初始化做了什么？ _init哪来的？
  // _init哪来的？ initMixin(Vue)混入来的
  this._init(options)
}

initMixin(Vue) // 混入实现_init方法 选项的合并： 通用选项component,filter,directive 和用户选项合并
// 实现实例方法
stateMixin(Vue) // $set $delete $watch $data $props
eventsMixin(Vue) // $emit $on
lifecycleMixin(Vue) // _update更新检查 $forceUpdate $destroy
renderMixin(Vue) // $nextTick _render

export default Vue
