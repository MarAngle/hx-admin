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
      <SiderMenu
        mode="inline"
        theme="dark"
        :menu="menu.data.list"
        :selectedKeys="menu.data.menu"
        :collapsed="collapsed"
        @select="onSelect"
      ></SiderMenu>
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

import SiderMenu from '../SiderMenu';

export default {
  name: 'SiderView',
  components: {
    SiderMenu: SiderMenu
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
