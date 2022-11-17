import _func from "complex-func";
import { DefaultData } from "complex-data";

class DictList extends DefaultData {
  constructor(initOption) {
    super(initOption)
    this.$list = initOption.list.map(item => {
      if (item.$filter) {
        if (_func.getType(item.$filter) !== 'array') {
          item.$filter = [ item.$filter ]
        }
      }
    })
  }
  pushToList(list, item, format) {
    if (format) {
      list.push(format(item))
    } else {
      list.push(item)
    }
  }
  getList(option) {
    let filter = option.filter
    let format = option.format
    let list = []
    
    if (!filter) {
      this.$list.forEach(item => {
        this.pushToList(list, item, format)
      })
    } else {
      let filterType = _func.getType(filter)
      if (filterType != 'function') {
        if (filterType !== 'array') {
          filter = [filter]
        }
        this.$list.forEach(item => {
          if (!item.$filter) {
            list.push(item)
          } else {
            for (let i = 0; i < filter.length; i++) {
              const filterProp = filter[i];
              if (item.$filter.indexOf(filterProp) > -1) {
                this.pushToList(list, item, format)
                break
              }
            }
          }
        })
      } else {
        this.$list.forEach(item => {
          if(filter(item)) {
            this.pushToList(list, item, format)
          }
        })
      }

    }
    return list
  }
}


export default DictList
