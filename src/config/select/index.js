import _func from 'complex-func'

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
  getItemByFormat(mod, prop, currentData, option) {
    let selectData = this.getItem('data', mod, prop)
    return _func.buildDictionaryItemBySelect(selectData, currentData, option)
  }
}

select.loadContents(dataContents, 'data')

export default select
