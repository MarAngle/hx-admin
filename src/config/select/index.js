import _func from 'complex-func'
import SelectSwitch from '@/config/components/mod/SelectSwitch.vue'

const dataContents = require.context('./data', false, /\.js$/)

let select = {
  data: {},
  post: {},
  search: {},
  loadContents (contents, target) {
    if (!this[target]) {
      this[target] = {}
    }
    _func.loadContents(contents, (moditem, path) => {
      let modname = path.replace(/^\.\/(.*)\.\w+$/, '$1')
      if (!this[target][modname]) {
        this[target][modname] = moditem.default
      } else {
        console.error('auto mod load is repeat')
      }
    })
  },
  getItem (target, mod, prop) {
    if (this[target]) {
      if (mod) {
        if (this[target][mod]) {
          if (prop) {
            return this[target][mod][prop] || null
          } else {
            return this[target][mod] || null
          }
        } else {
          return null
        }
      } else {
        return this[target] || null
      }
    } else {
      return null
    }
  },
  getItemBySelect (selectData, currentData, option = {}) {
    if (selectData.constructor.$name == 'SelectData') {
      selectData = selectData.getModule('select')
    }
    let valueProp = option.value || 'value'
    let labelProp = option.label || 'label'
    let color = option.color
    let format = option.format || {}
    let formatBefore = format.before
    let formatAfter = format.after
    let formatFunc
    if (!formatBefore && !formatAfter) {
      formatFunc = function(data) {
        return selectData.getItem(data)
      }
    } else if (formatBefore && !formatAfter) {
      formatFunc = function(data, payload) {
        data = formatBefore(data, payload)
        return selectData.getItem(data)
      }
    } else if (!formatBefore && formatAfter) {
      formatFunc = function(data, payload) {
        let value = selectData.getItem(data)
        return formatAfter(value, payload)
      }
    } else if (formatBefore && formatAfter) {
      formatFunc = function(data, payload) {
        data = formatBefore(data, payload)
        let value = selectData.getItem(data)
        return formatAfter(value, payload)
      }
    }
    let data = {
      showprop: {
        list: labelProp,
        default: valueProp
      },
      func: {
        format: formatFunc
      },
      mod: {
        list: {}
      }
    }
    if (!option.unBuildMod) {
      data.mod.edit = {
        type: 'select',
        width: option.editWidth,
        option: {
          list: selectData.getList(option.listPayload),
          optionValue: valueProp,
          optionLabel: labelProp
        }
      }
      data.mod.build = {
        type: 'edit'
      }
      data.mod.change = {
        type: 'edit'
      }
    }
    let prop = currentData.prop
    if (color) {
      data.mod.list.customCell = function(record) {
        let value = record[prop]
        return {
          style: {
            color: value.color
          }
        }
      }
    }
    if (option.switch) {
      data.mod.list.customRender = function (text, record, index) {
        return _func.$EventBus.$createElement(SelectSwitch, {
          props: {
            value: record[prop],
            operate: !!option.switch.operate
          },
          on: {
            change(currentValue) {
              let list = selectData.getList()
              for (let i = 0; i < list.length; i++) {
                const item = list[i]
                if (item._switch === currentValue) {
                  option.switch.operate(item, record, prop)
                  break
                }
              }
            }
          }
        })
      }
    }
    let selectDefaultDictionary = selectData.getExtra('dictionary')
    if (!selectDefaultDictionary) {
      return _func.mergeData(data, currentData)
    } else {
      if (typeof selectDefaultDictionary == 'function') {
        selectDefaultDictionary = selectDefaultDictionary({ prop: currentData.prop })
      }
      return _func.mergeData(data, selectDefaultDictionary, currentData)
    }
  },
  getItemByFormat(mod, prop, currentData, option) {
    let selectData = this.getItem('data', mod, prop)
    return this.getItemBySelect(selectData, currentData, option)
  }
}

select.loadContents(dataContents, 'data')

export default select
