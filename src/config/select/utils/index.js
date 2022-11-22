export const parseOption = function(defaultData, option) {
  if (!defaultData.func) {
    defaultData.func = {}
  }
  if (!defaultData.mod) {
    defaultData.mod = {}
  }
  if (option.multiple) {
    if (defaultData.func.edit) {
      const lastFunc = defaultData.func.edit
      defaultData.func.edit = function(data, ...args) {
        if (data) {
          return lastFunc(data.split(option.multiple), ...args)
        } else {
          return lastFunc([], ...args)
        }
      }
    } else {
      defaultData.func.edit = function(data) {
        if (data) {
          return data.split(option.multiple)
        } else {
          return []
        }
      }
    }
    if (defaultData.func.unedit) {
      const lastFunc = defaultData.func.unedit
      defaultData.func.unedit = function(data, ...args) {
        if (data) {
          return lastFunc(data.join(option.multiple), ...args)
        } else {
          return lastFunc(data, ...args)
        }
      }
    } else {
      defaultData.func.unedit = function(data) {
        if (data) {
          return data.join(option.multiple)
        }
        return data
      }
    }
    defaultData.mod.edit.option.mode = 'multiple'
  }
}