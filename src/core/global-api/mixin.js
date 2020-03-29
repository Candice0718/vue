/* @flow */

import { mergeOptions } from '../util/index'

export function initMixin (Vue: GlobalAPI) {
  // 将mixin混入this.$options
  Vue.mixin = function (mixin: Object) {
    // this.$options是parent
    // mixin是child
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}
