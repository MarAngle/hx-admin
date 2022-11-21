<style lang="less" scoped>
.sider-view{
  background-color: #001529;
  .sider-toggle{
    padding: 10px 0;
    text-align: center;
  }
}
</style>

<template>
  <div class="sider-view local-flex-main local-flex-main-column">
    <div class="local-flex-main-item auto">
      <a-menu
        mode="inline"
        theme="dark"
        :selectedKeys="menu.data.menu"
        :inline-collapsed="collapsed"
        @select="onSelect"
      >
        <template v-for="item in currentMenu">
          <a-menu-item v-if="!item.children" :key="item.path">
            <a-icon :type="item.meta.icon" />
            <span>{{ item.meta.name }}</span>
          </a-menu-item>
          <sub-menu v-else :key="item.path" :menu-info="item" />
        </template>
      </a-menu>
    </div>
    <div class="sider-toggle local-flex-main-item fixed">
      <a-button type="primary" @click="changSiderType">
        <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
      </a-button>
    </div>  
  </div>
</template>

<script>
import menu from '@/main/data/menu';

import { Menu as AntdMenu } from 'ant-design-vue';
const SubMenu = {
  template: `
      <a-sub-menu :key="menuInfo.path" v-bind="$props" v-on="$listeners">
        <span slot="title">
          <span>{{ menuInfo.meta.name }}</span>
        </span>
        <template v-for="item in menuInfo.children">
          <a-menu-item v-if="!item.children" :key="item.path">
            <span>{{ item.title }}</span>
          </a-menu-item>
          <sub-menu v-else :key="item.path" :menu-info="item" />
        </template>
      </a-sub-menu>
    `,
  name: 'SubMenu',
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    ...AntdMenu.SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
};

export default {
  name: 'SiderView',
  components: {
    'sub-menu': SubMenu,
  },
  props: ['page'],
  data() {
    return {
      menu: menu
    }
  },
  computed: {
    collapsed() {
      return this.page.mod.sider.type == 'mini'
    },
    currentMenu() {
      return this.formatMenu(menu.data.list)
    }
  },
  watch: {
    '$route': {
      immediate: true,
      handler(val) {
        this.menu.setCurrent([val.path])
      }
    }
  },
  methods: {
    formatMenu(menuList) {
      let list = []
      menuList.map(menuItem => {
        let item
        if (menuItem.meta.menu && !menuItem.meta.hidden) {
          item = {
            ...menuItem,
            children: undefined
          }
          if (menuItem.children && menuItem.children.length > 0) {
            item.children = this.formatMenu(menuItem.children)
          }
          list.push(item)
        }
      })
      return list
    },
    changSiderType() {
      let targetType = this.page.mod.sider.type == 'mini' ? 'default' : 'mini'
      this.page.triggerChange('sider', targetType)
    },
    onSelect({ key, item }) {
      if (key !== this.menu.data.menu) {
        this.$router.push(key)
      }
    }
  }
}
</script>
