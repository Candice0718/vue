/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  // ASSET_TYPES = [component、filter、directive]
  ASSET_TYPES.forEach(type => {
    // 举例： 给Vue[component] = function() {}
    // Vue.component(id, {组件配置对象})
    Vue[type] = function (
      id: string,
      definition: Function | Object // 组件配置对象
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id)
        }
        // definition是组件配置对象
        if (type === 'component' && isPlainObject(definition)) {
          // 声明组件名称
          definition.name = definition.name || id
          // Vue.extend({}) 生成构造函数
          // _base是Vue构造函数
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        // 相当于options.components = Ctor
        // 其他组件在初始化时做选项合并，此时这里声明的内容就会出现在自定义组件中
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
