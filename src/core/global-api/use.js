/* @flow */

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  // use方法接受函数或者对象
  // Vue.use(VueRouter) class VueRouter{ install() {}} 
  // Vue.use(Vuex) Object = {Store, install}
  Vue.use = function (plugin: Function | Object) {
    // 获取Vue实例已经安装的Plugins
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    // 如果已经安装过了，就不在安装
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    // 插件的安装工作
    // 插件的安装参数都存放在args中
    const args = toArray(arguments, 1)
    // 在参数数组的最前面放入Vue的构造函数
    args.unshift(this)
    if (typeof plugin.install === 'function') { // Object
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') { // Function
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}
