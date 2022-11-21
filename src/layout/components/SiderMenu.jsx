import _func from 'complex-func'
import { Menu, Icon } from 'ant-design-vue'

const { Item, SubMenu } = Menu

export default {
  name: 'SiderMenu',
  props: {
    menu: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    selectedKeys: {
      type: Array,
      required: false,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      currentSelectedKeys: []
    }
  },
  methods: {
    // render
    renderItem (menu) {
      if (!menu.hidden) {
        return menu.children && menu.children.length > 0 ? this.renderSubMenu(menu) : this.renderMenuItem(menu)
      }
      return null
    },
    renderMenuItem (menu) {
      return (
        <Item {...{ key: menu.path }}>
          {this.renderIcon(menu.meta.icon)}
          <span>{menu.meta.name}</span>
        </Item>
      )
    },
    renderSubMenu (menu) {
      const itemArr = []
      menu.children.forEach(item => itemArr.push(this.renderItem(item)))
      return (
        <SubMenu {...{ key: menu.path }}>
          <span slot="title">
            {this.renderIcon(menu.meta.icon)}
            <span>{menu.meta.name}</span>
          </span>
          {itemArr}
        </SubMenu>
      )
    },
    renderIcon (icon) {
      if (icon === 'none' || icon === undefined) {
        return null
      }
      const props = {}
      typeof (icon) === 'object' ? props.component = icon : props.type = icon
      return (
        <Icon {... { props } }/>
      )
    }
  },
  render() {
    const { mode, theme, menu } = this
    const props = {
      mode: mode,
      theme: theme,
      inlineCollapsed: this.collapsed,
      selectedKeys: this.currentSelectedKeys
    }
    const on = {
      select: obj => {
        this.currentSelectedKeys = obj.selectedKeys
        this.$emit('select', obj)
      }
    }

    const menuTree = menu.map(item => {
      if (item.hidden) {
        return null
      }
      return this.renderItem(item)
    })
    // {...{ props, on: on }}
    return (
      <Menu {...{ props, on: on }}>
        {menuTree}
      </Menu>
    )
  }
}
