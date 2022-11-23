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
      currentSelectedKeys: [],
      openKeys: [],
      cachedOpenKeys: []
    }
  },
  computed: {
    rootSubmenuKeys () {
      const keys = []
      this.menu.forEach(item => keys.push(item.path))
      return keys
    }
  },
  watch: {
    collapsed (val) {
      if (val) {
        this.cachedOpenKeys = this.openKeys.concat()
        this.openKeys = []
      } else {
        this.openKeys = this.cachedOpenKeys
      }
    },
    selectedKeys(val) {
      if (this.currentSelectedKeys !== val) {
        this.currentSelectedKeys = val
      }
    },
    $route: function () {
      this.updateOpenKeys()
    }
  },
  mounted () {
    this.updateOpenKeys()
  },
  methods: {
    updateOpenKeys () {
      const routes = this.$route.matched.concat()
      const { hidden } = this.$route.meta
      const openKeys = []
      if (this.mode === 'inline') {
        routes.forEach(item => {
          openKeys.push(item.path)
        })
      }
      this.collapsed ? (this.cachedOpenKeys = openKeys) : (this.openKeys = openKeys)
    },
    onOpenChange (openKeys) {
      // 在水平模式下时执行，并且不再执行后续
      if (this.mode === 'horizontal') {
        this.openKeys = openKeys
        return
      }
      // 非水平模式时
      const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key))
      if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
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
      selectedKeys: this.currentSelectedKeys,
      openKeys: this.openKeys
    }
    const on = {
      select: obj => {
        this.currentSelectedKeys = obj.selectedKeys
        this.$emit('select', obj)
      },
      openChange: this.onOpenChange
    }
    const menuTree = menu.map(item => {
      if (item.hidden) {
        return null
      }
      return this.renderItem(item)
    })
    return (
      <Menu {...{ props, on: on }}>
        {menuTree}
      </Menu>
    )
  }
}
